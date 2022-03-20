const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const AuthError = require('../errors/auth-error');
const DuplicateError = require('../errors/duplicate-error');
const NotFoundError = require('../errors/not-found-error');

const Users = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;

const getUsers = async (req, res, next) => {
  try {
    const data = await Users.find({});

    return res.send(data);
  } catch (error) {
    return next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await Users.findById(req.params.id);

    if (!user) {
      return next(new NotFoundError('Запрашиваемый пользователь не найден'));
    }

    return res.send(user);
  } catch (error) {
    return next(error);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    const user = await Users.findById(req.user._id);

    if (!user) {
      return next(new NotFoundError('Запрашиваемый пользователь не найден'));
    }

    return res.send(user);
  } catch (error) {
    return next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const {
      name,
      about,
      avatar,
      email,
      password,
    } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await Users.create({
      name,
      about,
      avatar,
      email,
      password: passwordHash,
    });

    user.password = undefined;

    return res.send(user);
  } catch (error) {
    if (error.code === 11000) {
      return next(new DuplicateError('Такой email уже зарегистрирован'));
    }

    return next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { name, about } = req.body;

    const user = await Users.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true },
    );

    if (!user) {
      return next(new NotFoundError('Запрашиваемый пользователь не найден'));
    }

    return res.send(user);
  } catch (error) {
    return next(error);
  }
};

const updateUserAvatar = async (req, res, next) => {
  try {
    const { avatar } = req.body;

    const user = await Users.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true },
    );

    if (!user) {
      return next(new NotFoundError('Запрашиваемый пользователь не найден'));
    }

    return res.send(user);
  } catch (error) {
    return next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await Users.findOne({ email }).select('+password');

  if (!user) {
    return next(new AuthError('Неправильные почта или пароль'));
  }

  const matched = await bcrypt.compare(password, user.password);

  if (!matched) {
    return next(new AuthError('Неправильные почта или пароль'));
  }

  const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');

  return res
    .cookie('token', token, {
      maxAge: 60 * 60 * 60 * 24,
      httpOnly: true,
      sameSite: 'None',
      secure: true,
    })
    .send({ message: 'Успешно' });
};

const logout = (req, res) => res.clearCookie('token', {
  httpOnly: true,
  sameSite: 'None',
  secure: true,
}).send({ message: 'Досвидания' });

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateUserAvatar,
  login,
  logout,
  getCurrentUser,
};
