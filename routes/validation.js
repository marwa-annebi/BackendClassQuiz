const Joi = require("@hapi/joi");

//register validation

const registerValidation = (data) => {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      password: Joi.string().min(6),
      verifPassword: Joi.string().min(6),
      age: Joi.number().required(),
    });
    return schema.validate(data);
  };
  //login validation
  const loginValidation = (data) => {
    const schema = Joi.object({
      email: Joi.string().required().email(),
      password: Joi.string().min(6).required(),
    });
    return schema.validate(data);
  };

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;