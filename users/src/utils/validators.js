const Joi = require("joi");
module.exports.validateSignUpBody = (body) => {
  const schema = Joi.object({
    email: Joi.string()
      .email()
      .pattern(
        new RegExp(
          "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@publicissapient.com$"
        )
      ),
    firstname: Joi.string().alphanum().min(3).max(30).required(),
    lastname: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().pattern(
      new RegExp(
        "(?=^.{8,}$)(?=.*d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
      )
    ),
    phone: Joi.string()
      .trim()
      .regex(/^[0-9]{7,10}$/)
      .required(),
  });

  return schema.validate(body);
};
module.exports.validateSignInBody = (body) => {
  const schema = Joi.object({
    email: Joi.string()
      .email()
      .pattern(
        new RegExp(
          "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@publicissapient.com$"
        )
      ),
    password: Joi.string().required(),
  });

  return schema.validate(body);
};
