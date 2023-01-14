const { Contacts } = require('../models/schemaMongoose');
const { HttpError } = require("../utils/tryCatch");

const getListContacts = async (req, res, next) => {
  const contacts = await Contacts.find({})
  res.json(contacts)    
}

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contacts.findById(contactId)
  
  if (!contact) {
    return next(HttpError(404, `We didn't find anyone with ID ${contactId}. Please try again`));
  }

  return res.json(contact);
}

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contacts.findByIdAndRemove(contactId)
  
  if (!contact) {
    return next(HttpError(404, `We didn't find anyone with ID ${contactId}. Please try again`));
  }

  return res.json({message: `Contact with ID ${contactId} deleted successfully`});
}

const addContact = async (req, res, next) => {
  const { name, email, phone } = req.query;
  const contact = await Contacts.create({ name, email, phone })

  return res.status(201).json(contact);
}

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contacts.findByIdAndUpdate(contactId, req.query, { new: true})

  return res.status(201).json(contact);
}


module.exports = {
  getListContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
