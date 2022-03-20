const Cards = require('../models/card');

const ForbiddenError = require('../errors/forbidden-error');
const NotFoundError = require('../errors/not-found-error');

const getCards = async (req, res, next) => {
  try {
    const data = await Cards.find({}).populate('likes owner');

    return res.send(data);
  } catch (error) {
    return next(error);
  }
};

const createCard = async (req, res, next) => {
  try {
    const { name, link } = req.body;

    const card = await Cards.create({ name, link, owner: req.user._id });

    return res.send(card);
  } catch (error) {
    return next(error);
  }
};

const deleteCard = async (req, res, next) => {
  try {
    const card = await Cards.findOne({ _id: req.params.id });

    if (!card) {
      return next(new NotFoundError('Запрашиваемая карточка не найдена'));
    }

    if (String(card.owner) !== req.user._id) {
      return next(new ForbiddenError('Нет прав на удаление этой карточки'));
    }

    await card.remove();
    return res.send(card);
  } catch (error) {
    return next(error);
  }
};

const addLike = async (req, res, next) => {
  try {
    const card = await Cards.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    ).populate('likes owner');

    if (!card) {
      return next(new NotFoundError('Запрашиваемая карточка не найдена'));
    }

    return res.send(card);
  } catch (error) {
    return next(error);
  }
};

const deleteLike = async (req, res, next) => {
  try {
    const card = await Cards.findByIdAndUpdate(
      req.params.id,
      { $pull: { likes: req.user._id } },
      { new: true },
    ).populate('likes owner');

    if (!card) {
      return next(new NotFoundError('Запрашиваемая карточка не найдена'));
    }

    return res.send(card);
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
