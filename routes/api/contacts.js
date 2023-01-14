const express = require('express')

const { tryCatch} = require('../../utils/tryCatch')
const { middleware } = require('../../middleware/middlewareValidate')
const { validSchemaPost, validSchemaPut } = require('../../utils/validSchema.js')
const { getListContacts, getContactById, removeContact, addContact, updateContact } = require('../../controller/controller');

const router = express.Router()

router.get('/', tryCatch(getListContacts))
    .get('/:contactId', tryCatch(getContactById))
    .delete('/:contactId', tryCatch(removeContact))
    .post('/', middleware(validSchemaPost, 'query'), tryCatch(addContact))
    .put('/:contactId', middleware(validSchemaPut, 'query'), tryCatch(updateContact))


module.exports = router
