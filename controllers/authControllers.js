import HttpError from '../helpers/HttpError.js'
import * as authServices from '../services/authServices.js'

export const signup =  async (req, res, next) => { 
    const{email} = req.body;
    try {
        const user = await authServices.findUser({email});
        if(user) {
            throw HttpError(409, "Email in use")
        }
      const newUser = await authServices.signup (req.body) ;
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