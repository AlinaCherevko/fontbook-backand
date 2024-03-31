import {
  getContacts,
  removeContact,
  createNewContact,
} from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";

export const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await getContacts(owner);
  res.json(result);
};

export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id: owner } = req.user;
    const result = await removeContact(id, owner);

    if (!result) {
      throw HttpError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res) => {
  const { _id: owner } = req.user;
  const body = { ...req.body, owner };
  const newContact = await createNewContact(body);
  res.status(201).json(newContact);
};
