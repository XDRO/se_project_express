const { Joi, celebrate } = require("celebrate");

const validator = require("validator");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

module.exports.validateCardBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
    imageUrl: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "imageUrl" field must be filled in',
      "string.uri": 'the "imageUrl" field must be a valid url',
    }),
    weather: Joi.string().valid("hot", "warm", "cold").required(),
  }),
});

module.exports.validateId = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().hex({ prefix: "optional" }).required(),
  }),
});

module.exports.validateUserInfoBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
    avatar: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "Avatar" field must be filled in',
      "string.uri": 'the "Avatar" field must be a valid url',
    }),
    email: Joi.string().email({
      minDomainSegments: 2,
      // tlds: { allow: ["com", "net"] },
    }),
    password: Joi.string().required().messages({
      "string.empty": "Password field cannot be empty",
    }),
  }),
});
// .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))

module.exports.userLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email({
      minDomainSegments: 2,
      // tlds: { allow: ["com", "net"] },
    }),
    password: Joi.string().required().messages({
      "string.empty": "Password field cannot be empty",
    }),
  }),
});
