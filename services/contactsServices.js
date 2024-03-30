import Contact from "../models/Contact.js";

export const listContacts = (filter = {}, setting = {})=> Contact.find( filter, "-createdAt -updatedAt", setting);

export const countContacts = filter => Contact.countDocuments(filter);

export const addContact = data => Contact.create(data);

// export const getContactById = contactId => Contact.findById(contactId)
export const getContactByFilter = filter => Contact.findOne(filter)

export const updateContactByFilter = (filter, data) => Contact.findOneAndUpdate(filter, data)

export const removeContactByFilter = (filter) => Contact.findOneAndDelete(filter);

// export const updateStatusContact = (contactId, data) => Contact.findByIdAndUpdate(contactId, data)









  