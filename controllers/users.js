const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../models/user');

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
      return res.status(404).send({ message: 'Запрашиваемый пользователь не найден' });
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

    return res.send(user);
  } catch (error) {
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
      return res.status(404).send({ message: 'Запрашиваемый пользователь не найден' });
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
      return res.status(404).send({ message: 'Запрашиваемый пользователь не найден' });
    }

    return res.send(user);
  } catch (error) {
    return next(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await Users.findOne({ email });

  if (!user) {
    return res.status(401).send({ message: 'Неправильные почта или пароль' });
  }

  const matched = await bcrypt.compare(password, user.password);

  if (!matched) {
    return res.status(401).send({ message: 'Неправильные почта или пароль' });
  }

  const token = jwt.sign({ _id: user._id }, 'some-secret-key');

  return res.cookie('token', token, { maxAge: 60 * 60 * 24, httpOnly: true }).sendStatus(200);
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateUserAvatar,
  login,
};
