const express = require('express')

const { tryCatch} = require('../../utils/tryCatch')
// const { middleware } = require('../../middleware/middlewareValidate')
// const { validSchemaPost, validSchemaPut } = require('../../utils/validSchema.js')
const { getListContacts, getContactById, removeContact } = require('../../controller/controller');

const router = express.Router()

router.get('/', tryCatch(getListContacts))
    .get('/:contactId', tryCatch(getContactById))
    .delete('/:contactId', tryCatch(removeContact))





// router.post('/', middleware(validSchemaPost, 'query'), async (req, res, next) => {
//   const addedContact = await addContact(req.query)

//   res.status(201).json(addedContact)

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
