const express = require('express')

const router = express.Router()

const { getListContacts,
  getContactById
    } = require('../../models/contacts');

router.get('/', async (req, res, next) => {
  try {
    const contacts = await getListContacts()
    res.json(contacts)
  } catch (error) {
    console.log(error.message)
  }
})

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const contactsById = await getContactById(contactId)
  res.json(contactsById)
})

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
