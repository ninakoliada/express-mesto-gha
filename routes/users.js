const router = require('express').Router();
// const { celebrate, Joi } = require('celebrate');
const {
  getUsers,
  getUser,
  updateUser,
  updateUserAvatar,
  getCurrentUser,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/me', getCurrentUser);
router.get('/users/:id', getUser);
router.patch('/users/me', updateUser);
router.patch('/users/me/avatar', updateUserAvatar);
module.exports = router;
