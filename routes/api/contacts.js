const express = require('express')
const { validSchemaPost, validSchemaPut } = require('../../utils/validSchema.js')

const router = express.Router()

const { getListContacts,
  getContactById, 
  removeContact, 
  addContact, 
  updateContact
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
  const contactById = await getContactById(contactId)

  if(!contactById ) {
    return res.status(404).json({
    message: `We didn't find anyone with ID ${contactId}. Please try again`
    })
  }
  res.status(200).json(contactById)
}) 

router.post('/', async (req, res, next) => {
  const { name, email, phone } = req.query
  const addedContact = await addContact(req.query)

  const { error } = validSchemaPost.validate(req.query)

  if (error) {
    res.status(400).json({ "message": "Validation error.  Please try again" })
    return
  }

  if (name === "" || email === "" || phone === "") {
    res.status(400).json({"message": "Missing required name field"})
  } else {
    res.status(201).json(addedContact)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params
  const contactById = await getContactById(contactId)
  
  if (contactById === undefined) {
    res.status(404).json({
    message: `Contact with ID ${contactId} not found. Please try again`
  })
  } else {
    await removeContact(contactId)
    res.status(200).json({
    message: `Contact with ID ${contactId} deleted successfully`
  })
  }
})

router.put('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const body = req.query
  const contactforUpdate = await updateContact(contactId, body)

  const { error } = validSchemaPut.validate(req.query)

  if (error) {
    res.status(400).json({ "message": "Validation error.  Please try again" })
    return
  }

  if (!contactforUpdate) {
    res.status(404).json({"message": "Not found"})
  } else {
    res.status(200).json(contactforUpdate)
  }
})

module.exports = router
