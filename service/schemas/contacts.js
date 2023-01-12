const mongoose = require('mongoose') ;
const { Schema, model } = mongoose;

const contactsSchema = new Schema  ({
    name: {
        type: String,
        minLength: [1],
        maxLength: [40],
      required: [true, 'Set name for contact'],
    },
    email: {
        type: String,
        minLength: [5],
        unique: true,
    },
    phone: {
        type: String,
        minLength: [1],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
})

const Contacts = model('db-contacts', contactsSchema)
  
module.exports = {Contacts}