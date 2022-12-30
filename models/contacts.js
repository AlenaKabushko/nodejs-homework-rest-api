const fs = require('fs/promises'); 
const path = require('path');
const uniqid = require('uniqid');

const contactsPath = path.normalize("./models/contacts.json");

const getListContacts = async () => {
    try {
        const data = await fs.readFile(contactsPath, "utf8")
        return JSON.parse(data)
    } catch (error) {
        console.log('error', error)
    }
}

const getContactById = async (contactId) => {
    try {
        const contacts = await getListContacts()
        const contactFromId = contacts.find((obj) => obj.id === contactId)
        return contactFromId
    } catch (error) {
        console.log('error', error)
    }
}

const removeContact = async (contactId) => {
    try {
        const contacts = await getListContacts();
        const updateContacts =
            contacts.filter((obj) => obj.id !== contactId);
        await fs.writeFile(contactsPath, JSON.stringify(updateContacts, null, '\t'), "utf-8")
        return contacts
    } catch (error) {
        console.log('error', error)
    }
}

const addContact = async (body) => {
    try {
        const id = uniqid()
        const { name, email, phone } = body
        const addedContact = { id, name, email, phone }
        
        const contacts = await getListContacts()        
        contacts.push(addedContact)
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, '\t'), "utf-8")
        return addedContact
    } catch (error) {
        console.log('error', error)
    }
}

const updateContact = async (contactId, body) => {
    try {
        // const contactForUpdate = await getContactById(contactId)

    } catch (error) {
        
    }
}

module.exports = {
  getListContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
