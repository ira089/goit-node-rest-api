import Joi from "joi";
import * as userConstants from '../constants/userConstants.js'
// import { emailRegepxp,sub } from "../constants/user-constants.js";

 const userSignupSchema = Joi.object({
    email: Joi.string().pattern(userConstants.emailRegepxp).required(),
    password: Joi.string().required(),
    subscription: Joi.string().valid(...userConstants.subscriptionList),
})

export default userSignupSchema