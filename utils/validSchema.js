const Joi = require("joi");

const validSchemaPost = Joi.object({
  name: Joi.string().min(1).max(40).required(),
  email: Joi.string().min(5).email().required(),
  phone: Joi.number().min(6).integer().required(),
});


const validSchemaPut = Joi.object({
  name: Joi.string().min(1).max(40),
  email: Joi.string().min(5).email(),
  phone: Joi.number().min(6).integer(),
}).min(1);

module.exports = {
    validSchemaPost,
    validSchemaPut
};