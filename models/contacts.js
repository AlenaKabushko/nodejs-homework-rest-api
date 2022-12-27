const fs = require('fs/promises'); 
const path = require('path');

const contactsPath = path.normalize("./models/contacts.json");

const getListContacts = async () => {
   try {
        const data = await fs.readFile(contactsPath, "utf8");
        return JSON.parse(data)
    } catch (error) {
        console.log('error', error);
    }
}

const getContactById = async (contactId) => {
   try {
     const contacts = await getListContacts()
     const contactFromId = contacts.find((obj) => obj.id === contactId)
     return contactFromId
     //  if (contacts !== []) {
    //    return contactFromId
    //  } 
    // else {
    //    return { message: "we didn't find anyone with that ID. Please try again" }
    //  }
     
    } catch (error) {
        console.log('error', error);
    }
}

const removeContact = async (contactId) => {}

const addContact = async (body) => {}

const updateContact = async (contactId, body) => {}

module.exports = {
  getListContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
