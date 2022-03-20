const { celebrate, Joi } = require('celebrate');
const urlValidator = require('./utils/urlValidator');

const createUserValidator = celebrate({
  body: {
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: urlValidator,
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
    id: Joi.string().hex().length(24),
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
    avatar: urlValidator,
  },
});

module.exports = {
  createUserValidator,
  loginValidator,
  getUserValidator,
  updateUserValidator,
  updateUserAvatarValidator,
};
