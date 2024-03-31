import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config.js"
import HttpError from '../helpers/HttpError.js'
import * as authServices from '../services/authServices.js'

const {JWT_SECRET} = process.env;


export const signup =  async (req, res, next) => { 
    const{email, password} = req.body;
    try {
        const user = await authServices.findUser({email});
        if(user) {
            throw HttpError(409, "Email in use")
        }
        const hashPassword = await bcryptjs.hash(password, 10);
      const newUser = await authServices.signup ({...req.body, password: hashPassword});

res.status(201).json({
    "user": {
        email: newUser.email,
        subscription: newUser.subscription,}
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
        const passwordCompane = await bcryptjs.compare(password, user.password);
        if (!passwordCompane) {
            throw HttpError(401, "Email or password is wrong");
        }

        const{_id: id} = user;
        const payload = {id};
        console.log(JWT_SECRET)
        const token = jwt.sign(payload, JWT_SECRET, {expiresIn: "27h"});
        await authServices.updateUser ({_id: id}, {token});

res.status(201).json({
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