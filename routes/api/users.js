const express = require('express')

const { tryCatch} = require('../../utils/tryCatch')
const { middleware } = require('../../middleware/middlewareValidate')
const { validSchemaPostUser } = require('../../utils/validSchema.js')
const { auth } = require('../../middleware/checkToken')
const {
    addUser,
    loginUser,
    logoutUser
    } = require('../../controller/controllerUsers');

const router = express.Router()

router.post('/signup', middleware(validSchemaPostUser, 'query'), tryCatch(addUser))
    .post('/login', middleware(validSchemaPostUser, 'query'), tryCatch(loginUser))
    .get('/logout', auth, tryCatch(logoutUser))




// .get('/:contactId', tryCatch(getContactById))
    // .delete('/:contactId', tryCatch(removeContact))
    // .post('/', middleware(validSchemaPost, 'query'), tryCatch(addContact))
    // .put('/:contactId', middleware(validSchemaPut, 'query'), tryCatch(updateContact))
    // .patch('/:contactId/favorite', middleware(validSchemaPatch, 'query'),  tryCatch(addContactToFav))

module.exports = router

