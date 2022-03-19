const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  addLike,
  deleteLike,
} = require('../controllers/cards');
const { createCardValidator, cardIdValidator } = require('../validators/cardValidator');

router.get('/cards', getCards);
router.post('/cards', createCardValidator, createCard);
router.delete('/cards/:id', cardIdValidator, deleteCard);
router.put('/cards/:id/likes', cardIdValidator, addLike);
router.delete('/cards/:id/likes', cardIdValidator, deleteLike);

module.exports = router;
