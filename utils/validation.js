const Joi = require("joi");

const registerValidation = (data) => {
  const schema = Joi.object().keys({
    password: Joi.string().min(3),
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
