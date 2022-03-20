const router = require('express').Router();

const {
  getUsers,
  getUser,
  updateUser,
  updateUserAvatar,
  getCurrentUser,
  logout,
} = require('../controllers/users');

const {
  getUserValidator,
  updateUserValidator,
  updateUserAvatarValidator,
} = require('../validators/userValidator');

router.get('/users', getUsers);
router.get('/users/me', getCurrentUser);
router.get('/users/:id', getUserValidator, getUser);
router.patch('/users/me', updateUserValidator, updateUser);
router.patch('/users/me/avatar', updateUserAvatarValidator, updateUserAvatar);
router.get('/logout', logout);

module.exports = router;
