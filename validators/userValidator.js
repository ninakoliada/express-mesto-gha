const { celebrate, Joi } = require('celebrate');

const createUserValidator = celebrate({
  body: {
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().uri(),
  },
});

const loginValidator = celebrate({
  body: {
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  },
});

const getUserValidator = celebrate({
  params: {
    id: Joi.string().alphanum().length(24),
  },
});

const updateUserValidator = celebrate({
  body: {
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  },
});

const updateUserAvatarValidator = celebrate({
  body: {
    avatar: Joi.string().uri(),
  },
});

module.exports = {
  createUserValidator,
  loginValidator,
  getUserValidator,
  updateUserValidator,
  updateUserAvatarValidator,
};
