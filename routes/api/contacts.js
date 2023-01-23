const express = require('express');

const { tryCatch } = require('../../utils/tryCatch');
const { middleware } = require('../../middleware/middlewareValidate');
const { validSchemaPost, validSchemaPut, validSchemaPatch } = require('../../utils/validSchema.js');
const { auth } = require('../../middleware/checkToken');
const {
    getListContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
    addContactToFav
} = require('../../controller/controller');

const router = express.Router();

router.get('/', auth, tryCatch(getListContacts))
    .get('/:contactId', auth, tryCatch(getContactById))
    .delete('/:contactId', auth, tryCatch(removeContact))
    .post('/', middleware(validSchemaPost, 'query'), auth, tryCatch(addContact))
    .put('/:contactId', middleware(validSchemaPut, 'query'), auth, tryCatch(updateContact))
    .patch('/:contactId/favorite', middleware(validSchemaPatch, 'query'), auth, tryCatch(addContactToFav))

module.exports = router
