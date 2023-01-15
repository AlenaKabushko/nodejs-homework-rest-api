const Joi = require("joi");

const validSchemaPost = Joi.object({
  name: Joi.string().min(1).max(40).required(),
  email: Joi.string().min(5).email().required(),
  phone: Joi.number().min(1).integer().required(),
});


const validSchemaPut = Joi.object({
  name: Joi.string().min(1).max(40),
  email: Joi.string().min(5).email(),
  phone: Joi.number().min(1).integer(),
}).min(1);

const validSchemaPatch = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {
    validSchemaPost,
    validSchemaPut, 
    validSchemaPatch
};