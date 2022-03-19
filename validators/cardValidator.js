const { celebrate, Joi } = require('celebrate');

const createCardValidator = celebrate({
  body: {
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().uri(),
  },
});

const cardIdValidator = celebrate({
  params: {
    id: Joi.string().alphanum().length(24),
  },
});

module.exports = {
  createCardValidator,
  cardIdValidator,
};
