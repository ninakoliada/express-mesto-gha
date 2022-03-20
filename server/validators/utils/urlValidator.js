const { Joi } = require('celebrate');
const validator = require('validator');

module.exports = Joi.string().custom((value, helper) => {
  const result = validator.isURL(value, { require_protocol: true });

  if (!result) {
    return helper.message('Некорректная ссылка');
  }

  return value;
});
