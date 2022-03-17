const Cards = require('../models/card');

const getCards = async (req, res, next) => {
  try {
    const data = await Cards.find({});

    return res.send(data);
  } catch (error) {
    return next(error);
  }
};

const createCard = async (req, res, next) => {
  try {
    const { name, link } = req.body;

    await Cards.create({ name, link, owner: req.user._id });

    return res.sendStatus(200);
  } catch (error) {
    return next(error);
  }
};

const deleteCard = async (req, res, next) => {
  try {
    const card = await Cards.findById(req.params.id);

    if (!card) {
      return res.status(404).send({ message: 'Запрашиваемая карточка не найдена' });
    }

    await Cards.findByIdAndRemove(req.params.id);

    return res.sendStatus(200);
  } catch (error) {
    return next(error);
  }
};

const addLike = async (req, res, next) => {
  try {
    const card = await Cards.findById(req.params.id);

    if (!card) {
      return res.status(404).send({ message: 'Запрашиваемая карточка не найдена' });
    }

    await Cards.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );

    return res.sendStatus(200);
  } catch (error) {
    return next(error);
  }
};

const deleteLike = async (req, res, next) => {
  try {
    const card = await Cards.findById(req.params.id);

    if (!card) {
      return res.status(404).send({ message: 'Запрашиваемая карточка не найдена' });
    }

    await Cards.findByIdAndUpdate(
      req.params.id,
      { $pull: { likes: req.user._id } },
      { new: true },
    );

    return res.sendStatus(200);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  addLike,
  deleteLike,
};
