import Contact from "../models/Contact.js";

export const listContacts = (filter = {}, setting = {})=> Contact.find( filter, "-createdAt -updatedAt", setting);

export const countContacts = filter => Contact.countDocuments(filter);

export const addContact = data => Contact.create(data);

export const getContactById = contactId => Contact.findById(contactId)

export const updateContact = (contactId, data) => Contact.findByIdAndUpdate(contactId, data)

export const removeContact = (contactId) => Contact.findByIdAndDelete(contactId);

// export const updateStatusContact = (contactId, data) => Contact.findByIdAndUpdate(contactId, data)









  