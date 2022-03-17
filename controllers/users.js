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
    const { name, about, avatar } = req.body;

    await Users.create({ name, about, avatar });

    return res.sendStatus(200);
  } catch (error) {
    return next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const user = await Users.findById(req.params.id);

    if (!user) {
      return res.status(404).send({ message: 'Запрашиваемый пользователь не найден' });
    }

    const { name, about } = req.body;

    await Users.findByIdAndUpdate(req.user._id, { name, about });

    return res.sendStatus(200);
  } catch (error) {
    return next(error);
  }
};

const updateUserAvatar = async (req, res, next) => {
  try {
    const user = await Users.findById(req.params.id);

    if (!user) {
      return res.status(404).send({ message: 'Запрашиваемый пользователь не найден' });
    }

    const { avatar } = req.body;

    await Users.findByIdAndUpdate(req.user._id, { avatar });

    return res.sendStatus(200);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateUserAvatar,
};
