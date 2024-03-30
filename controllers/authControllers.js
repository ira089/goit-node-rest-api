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
        // console.log(user)
        if(!user) {
            throw HttpError(401, "Email or password is wrong");
        }
        const passwordCompane = await bcryptjs.compare(password, user.password);
        if (!passwordCompane) {
            throw HttpError(401, "Email or password is wrong");
        }

        const{_id: id} = user;
        const payload = {id};
        // console.log(payload)
        console.log(JWT_SECRET)
        const token = jwt.sign(payload, JWT_SECRET, {expiresIn: "27h"});
        // console.log(token) 

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