import Joi from "joi";
import * as userConstants from '../constants/userConstants.js'

 export const userSignupSchema = Joi.object({
    email: Joi.string().pattern(userConstants.emailRegepxp).required(),
    password: Joi.string().required(),
    subscription: Joi.string().valid(...userConstants.subscriptionList),
})

export const userUpSubcription = Joi.object({
    
    subscription: Joi.string().valid(...userConstants.subscriptionList).required(),
})

export const userEmailSchema = Joi.object({
    email: Joi.string().pattern(userConstants.emailRegepxp).required(),
   
})