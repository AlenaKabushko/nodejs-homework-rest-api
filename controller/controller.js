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

// const removeContact = async (contactId) => {
//     try {
//         const contacts = await getListContacts()
//         const updateContacts =
//             contacts.filter((obj) => obj.id !== contactId);
//         await fs.writeFile(contactsPath, JSON.stringify(updateContacts, null, '\t'), "utf-8")
//         return contacts
//     } catch (error) {
//         console.log('error', error)
//     }
// }

// const addContact = async (body) => {
//     try {
//         const id = uniqid()
//         const { name, email, phone } = body
//         const addedContact = { id, name, email, phone }
        
//         const contacts = await getListContacts()        
//         contacts.push(addedContact)
//         await fs.writeFile(contactsPath, JSON.stringify(contacts, null, '\t'), "utf-8")
//         return addedContact
//     } catch (error) {
//         console.log('error', error)
//     }
// }

// const updateContact = async (contactId, body) => {
//     try {
//         const contacts = await getListContacts()
//         const contactFromId = contacts.find((obj) => obj.id === contactId)
        
//         contactFromId.name = body.name || contactFromId.name
//         contactFromId.email = body.email || contactFromId.email
//         contactFromId.phone = body.phone || contactFromId.phone
        
//         if (!contactFromId) {
//             return null
//         }

//         await fs.writeFile(contactsPath, JSON.stringify(contacts, null, '\t'), "utf-8")
//         return contactFromId
//     } catch (error) {
//         console.log('error', error)
//     }
// }

module.exports = {
  getListContacts,
  getContactById,
//   removeContact,
//   addContact,
//   updateContact,
}
