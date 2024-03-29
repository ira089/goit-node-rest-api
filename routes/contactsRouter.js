import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
} from "../controllers/contactsControllers.js";
import validateBody from '../helpers/validateBody.js'
import * as contactsSchemas from '../schemas/contactsSchemas.js'
import { isValidId } from "../middlewares/isValidId.js";


const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", isValidId, getOneContact);

contactsRouter.delete("/:id", isValidId, deleteContact);

contactsRouter.post("/", validateBody(contactsSchemas.createContactSchema), createContact);

contactsRouter.put("/:id", isValidId, validateBody(contactsSchemas.updateContactSchema), updateContact);

contactsRouter.patch("/:id/favorite", validateBody(contactsSchemas.updateStatusSchema), isValidId, updateStatusContact);

export default contactsRouter;