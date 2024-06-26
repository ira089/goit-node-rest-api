import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config.js"
import HttpError from '../helpers/HttpError.js'
import * as authServices from '../services/authServices.js'
import fs from "fs/promises";
import path from "path";
import gravatar from "gravatar";
import Jimp from "jimp";
import { nanoid } from "nanoid";
import sendEmail from "../helpers/sendEmail.js";

const avatarPath = path.resolve("public", "avatars");

const {JWT_SECRET, PROJECT_URL} = process.env;

export const signup =  async (req, res, next) => { 
    const{email, password} = req.body;
    try {
        const user = await authServices.findUser({email});
        if(user) {
            throw HttpError(409, "Email in use")
        }
        const hashPassword = await bcryptjs.hash(password, 10);
        const verificationToken= nanoid();
        const avatarURL = gravatar.url(email);

      const newUser = await authServices.signup ({...req.body, password: hashPassword, avatarURL, verificationToken});
const verifyEmail ={
    to: newUser.email,
    subject: "Verify email",
    html: `<a target="_blank" href="${PROJECT_URL}/api/users/verify/${verificationToken}"> Click verify email</a>`
}

await sendEmail(verifyEmail);

res.status(201).json({
    "user": {
        email: newUser.email,
        subscription: newUser.subscription,
        avatarURL: newUser.avatarURL,
    }
})
    }
    catch (error) {
        next(error)
    }
}

export const verify =  async (req, res, next) => { 
    const {verificationToken} = req.params;
    try {
        const user = await authServices.findUser({verificationToken});
        if(!user) {
            throw HttpError(404, "User not found")
        }
        await authServices.updateUser({_id: user._id}, {verify:true, verificationToken: ""})
     
res.status(200).json({
   message: "Verification successful" 
    
})
    }
    catch (error) {
        next(error)
    }
};

export const resendVerify =  async (req, res, next) => { 
    const {email} = req.body;
    try {
        const user = await authServices.findUser({email});
        if(!user) {
            throw HttpError(404, "Email not found")
        }

        if(user.verify) {
            throw HttpError(400, "Verification has already been passed")
        }
        const verifyEmail ={
            to: email,
            subject: "Verify email",
            html: `<a target="_blank" href="${PROJECT_URL}/api/users/verify/${user.verificationToken}"> Click verify email</a>`
        }
        
        await sendEmail(verifyEmail);
           
res.status(201).json({
   message: "Verification email sent"
})
    }
    catch (error) {
        next(error)
    }
};



export const signin =  async (req, res, next) => { 
    const{email, password} = req.body;
  
    try {
        const user = await authServices.findUser({email});
        if(!user) {
            throw HttpError(401, "Email or password is wrong");
        }
        if(!user.verify) {
            throw HttpError(401, "Email not verify");
        }

        const passwordCompane = await bcryptjs.compare(password, user.password);
        if (!passwordCompane) {
            throw HttpError(401, "Email or password is wrong");
        }

        const{_id: id} = user;
        const payload = {id};
        const token = jwt.sign(payload, JWT_SECRET, {expiresIn: "27h"});
        await authServices.updateUser ({_id: id}, {token});     

res.status(200).json({
    "token" : token,
    "user": {
        email: user.email,
        subscription: user.subscription,}
})
    }
    catch (error) {
        next(error)
    }
};

export const getCurrent =  async (req, res, next) => { 
    const{email, subscription} = req.user;
    try {res.status(201).json(
        {email,
          subscription,}
   )}
    catch (error) {
        next(error)
    } 
};

export const signout =  async (req, res, next) => { 
    const{_id} = req.user;
    try {
        await authServices.updateUser({_id}, {token: ""});
res.status(204).json()
    }
    catch (error) {
        next(error)
    }
};

export const  updateSubscription =  async (req, res, next) => { 
    const{_id, email} = req.user;
    const {subscription} = req.body;
    try {
        await authServices.updateUser({_id}, {subscription});
res.status(200).json( 
    {email,
    subscription})
    }
    catch (error) {
        next(error)
    }
};

export const  updateAvatar =  async (req, res, next) => { 
    const{_id} = req.user;
    
    try {
        if(!req.file) {
          
            
        throw HttpError(400, "Avatar not found");
        
    }
    const {path: oldPath, filename} = req.file;
    
    const newPath = path.join(avatarPath, filename);
        const img = await Jimp.read(oldPath);
        await img.cover(250, 250).writeAsync(oldPath)
        await fs.rename(oldPath, newPath);
        const avatarURL = path.join( "avatars", filename);
        console.log(avatarURL)
        await authServices.updateUser({_id}, {avatarURL});
res.status(200).json( 
    {avatarURL})
    }
    catch (error) {
        // await fs.unlink(oldPath)
        next(error)
    }
};


