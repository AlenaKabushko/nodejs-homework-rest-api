const express = require('express')

const { tryCatch} = require('../../utils/tryCatch')
const { middleware } = require('../../middleware/middlewareValidate')
const { validSchemaPost } = require('../../utils/validSchema.js')
const { getListContacts, getContactById, removeContact, addContact } = require('../../controller/controller');

const router = express.Router()

router.get('/', tryCatch(getListContacts))
    .get('/:contactId', tryCatch(getContactById))
    .delete('/:contactId', tryCatch(removeContact))
    .post('/', middleware(validSchemaPost, 'query'), tryCatch(addContact))





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
