import { Contact } from "../db/contacts.js";

export const getContacts = (owner) => {
  return Contact.find({ owner });
};
export const removeContact = (_id, owner) => {
  return Contact.findOneAndDelete({ _id, owner });
};
export const createNewContact = (body) => {
  return Contact.create(body);
};
