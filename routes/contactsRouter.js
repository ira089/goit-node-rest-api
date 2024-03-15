import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
} from "../controllers/contactsControllers.js";
import validateBody from '../helpers/validateBody.js'
import * as contactsSchemas from '../schemas/contactsSchemas.js'


const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", getOneContact);

contactsRouter.delete("/:id", deleteContact);

contactsRouter.post("/", validateBody(contactsSchemas.createContactSchema), createContact);

contactsRouter.put("/:id", validateBody(contactsSchemas.updateContactSchema), updateContact);

export default contactsRouter;