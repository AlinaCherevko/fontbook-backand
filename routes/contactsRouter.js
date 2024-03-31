import express from "express";
import {
  getAllContacts,
  deleteContact,
  createContact,
} from "../controllers/contactsControllers.js";
import { authenticate } from "../middlewares/authenticate.js";
import { isValidId } from "../middlewares/isValidId.js";

const contactsRouter = express.Router();

contactsRouter.get("/", authenticate, getAllContacts);

contactsRouter.delete("/:id", authenticate, isValidId, deleteContact);

contactsRouter.post("/", authenticate, createContact);

export default contactsRouter;
