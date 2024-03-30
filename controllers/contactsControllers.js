import HttpError from '../helpers/HttpError.js'
import * as contactsService from "../services/contactsServices.js";

export const getAllContacts =  async (req, res, next) => { 
    // console.log(req.user._id);
    const {_id: owner} = req.user;
    // console.log({owner})
    const{page = 1, limit = 20} = req.query;
    const skip = (page - 1) * limit;
    
    try {
     const result = await contactsService.listContacts({owner}, {skip, limit});  
     const total = await contactsService.countContacts({owner});   
res.json({
    result,
    total,
})
    }
    catch (error) {
        next(error)
    }
};

export const getOneContact = async(req, res, next) => {
    try {
        const {id} = req.params;
        const result = await contactsService.getContactById(id);
        if(!result) {
            throw HttpError(404)
        }
   res.json(result)
       }
       catch (error) {
           next(error)
       }  
};

export const deleteContact = async (req, res, next) => {
    try {
        const {id} = req.params;
        const result = await contactsService.removeContact(id);
        if(!result) {
            throw HttpError(404)
        }
   res.json(result)
       }
       catch (error) {
           next(error)
       }   
};

export const createContact = async (req, res, next) => {
    console.log(req.user)
    const {_id: owner} = req.user;
    try {
        const result = await contactsService.addContact({...req.body, owner});  
        console.log(result);    
   res.status(201).json(result)
       }
       catch (error) {
           next(error)
       }
};

export const updateContact = async (req, res, next) => {
    try {
        const {id} = req.params;
        const result = await contactsService.updateContact(id, req.body);
        if(!result) {
            throw HttpError(404)
        }
        if(Object.keys(req.body).length===0) {
            throw HttpError(400, 'Body must have at least one field')
        }
   res.json(result)
       }
       catch (error) {
           next(error)
       }    
};

export const updateStatusContact = async (req, res, next) => {
    try {
        const {id} = req.params;
        const result = await contactsService.updateContact(id, req.body);
        if(!result) {
            throw HttpError(404, "Not found")
        }
        
   res.json(result)
       }
       catch (error) {
           next(error)
       }    
};

