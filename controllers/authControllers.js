import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config.js"
import HttpError from '../helpers/HttpError.js'
import * as authServices from '../services/authServices.js'
import fs from "fs/promises";
import path from "path";
import gravatar from "gravatar";

const avatarPath = path.resolve("public", "avatars");

const {JWT_SECRET} = process.env;


export const signup =  async (req, res, next) => { 
    const{email, password} = req.body;
    try {
        const user = await authServices.findUser({email});
        if(user) {
            throw HttpError(409, "Email in use")
        }
        const hashPassword = await bcryptjs.hash(password, 10);
        const avatarURL = gravatar.url(email);
      const newUser = await authServices.signup ({...req.body, password: hashPassword, avatarURL});

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
};

export const signin =  async (req, res, next) => { 
    const{email, password} = req.body;
// const {path: oldPath, filename} = req.file;
// const newPath = path.join(avatarPath, filename);
// console.log(filename)
// console.log(newPath)
// console.log(oldPath)
    // console.log(req.body)
    // console.log(req.file)
   
    try {
        const user = await authServices.findUser({email});
        if(!user) {
            throw HttpError(401, "Email or password is wrong");
        }
        const passwordCompane = await bcryptjs.compare(password, user.password);
        if (!passwordCompane) {
            throw HttpError(401, "Email or password is wrong");
        }

        const{_id: id} = user;
        const payload = {id};

        // await fs.rename(oldPath, newPath);
        
        // const avatarURL = path.join( "avatars", filename);
        // console.log(avatarURL)
        const token = jwt.sign(payload, JWT_SECRET, {expiresIn: "27h"});
        await authServices.updateUser ({_id: id}, {token});
        
       
        

res.status(201).json({
    "token" : token,
    "user": {
        // avatarURL: user.avatar,
        email: user.email,
        subscription: user.subscription,}
})
    }
    catch (error) {
        // await fs.unlink(req.file.path)
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
    const {path: oldPath, filename} = req.file;
    const newPath = path.join(avatarPath, filename);
    try {
        await fs.rename(oldPath, newPath);
        const avatarURL = path.join( "avatars", filename);
        console.log(avatarURL)
        await authServices.updateUser({_id}, {avatarURL});
res.status(200).json( 
    {avatarURL})
    }
    catch (error) {
        await fs.unlink(oldPath)
        next(error)
    }
};