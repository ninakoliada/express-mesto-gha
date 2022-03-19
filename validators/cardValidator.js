const { celebrate, Joi } = require('celebrate');
const urlValidator = require('./utils/urlValidator');

const createCardValidator = celebrate({
  body: {
    name: Joi.string().required().min(2).max(30),
    link: urlValidator,
  },
});

const cardIdValidator = celebrate({
  params: {
    id: Joi.string().hex().length(24),
  },
});

module.exports = {
  createCardValidator,
  cardIdValidator,
};
