const express = require('express')

const { tryCatch} = require('../../utils/tryCatch')
// const { middleware } = require('../../middleware/middlewareValidate')
// const { validSchemaPost, validSchemaPut } = require('../../utils/validSchema.js')
const { getListContacts, getContactById } = require('../../controller/controller');

const router = express.Router()

// const { getListContacts,
//   // getContactById, 
//   // removeContact, 
//   // addContact, 
//   // updateContact
// } = require('../../models/contacts');
    
router.get('/', tryCatch(getListContacts))
    .get('/:contactId', tryCatch(getContactById))




// 
// router.get('/', async (req, res, next) => {
//   try {
//     const contacts = await getListContacts()
//     res.status(200).json(contacts)
//   } catch (error) {
//     console.log(error.message)
//   }
// })

// router.get('/:contactId', async (req, res, next) => {
//   const { contactId } = req.params;
//   const contactById = await getContactById(contactId)

//   if(!contactById ) {
//     return res.status(404).json({
//     message: `We didn't find anyone with ID ${contactId}. Please try again`
//     })
//   }
//   res.status(200).json(contactById)
// }) 

// router.post('/', middleware(validSchemaPost, 'query'), async (req, res, next) => {
//   const addedContact = await addContact(req.query)

//   res.status(201).json(addedContact)

// })

// router.delete('/:contactId', async (req, res, next) => {
//   const { contactId } = req.params
//   const contactById = await getContactById(contactId)
  
//   if (contactById === undefined) {
//     res.status(404).json({
//     message: `Contact with ID ${contactId} not found. Please try again`
//   })
//   } else {
//     await removeContact(contactId)
//     res.status(200).json({
//     message: `Contact with ID ${contactId} deleted successfully`
//   })
//   }
// })

// router.put('/:contactId',middleware(validSchemaPut, 'query'), async (req, res, next) => {
//   const { contactId } = req.params;
//   const body = req.query
//   const contactforUpdate = await updateContact(contactId, body)

//   if (!contactforUpdate) {
//     res.status(404).json({"message": "Not found"})
//   } else {
//     res.status(200).json(contactforUpdate)
//   }
// })

module.exports = router
