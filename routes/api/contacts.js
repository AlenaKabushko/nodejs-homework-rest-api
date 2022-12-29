const express = require('express')

const router = express.Router()

const { getListContacts,
  getContactById, 
  removeContact, 
  addContact
    } = require('../../models/contacts');

router.get('/', async (req, res, next) => {
  try {
    const contacts = await getListContacts()
    res.status(200).json(contacts)
  } catch (error) {
    console.log(error.message)
  }
})

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const contactsById = await getContactById(contactId)
  res.status(200).json(contactsById)
})

router.post('/', async (req, res, next) => {
  console.log(req.query, 'query')
   // eslint-disable-next-line no-unused-vars
  const addedContact = await addContact(req.query)
  res.status(201).json(addedContact)
  
})

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  // eslint-disable-next-line no-unused-vars
  const deletedContacts = await removeContact(contactId)
  
  res.status(200).json({ message: `Contact with ID ${contactId} deleted successfully` })
})

router.put('/:contactId', async (req, res, next) => {
  res.status(200).json({ message: 'template message put' })
})

module.exports = router
