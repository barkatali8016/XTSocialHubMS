const Joi = require("joi");

module.exports.validateSharePostBody = (body) => {
    const schema = Joi.object({
      userId: Joi.string().required(),
    });
  
    return schema.validate(body);
  };