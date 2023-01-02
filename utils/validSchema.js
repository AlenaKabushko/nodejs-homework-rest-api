const Joi = require("joi");

const validSchemaPost = Joi.object({
  name: Joi.string().min(1).max(40).required(),
  email: Joi.string().email().required(),
  phone: Joi.number().integer().required(),
});


const validSchemaPut = Joi.object({
  name: Joi.string().min(1).max(40),
  email: Joi.string().email(),
  phone: Joi.number().integer(),
});

module.exports = {
    validSchemaPost,
    validSchemaPut
};