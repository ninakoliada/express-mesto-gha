const jwt = require('jsonwebtoken');
const AuthError = require('../errors/auth-error');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { token } = req.cookies;

  try {
    const payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');
    req.user = payload;

    next();
  } catch (err) {
    next(new AuthError('Необходима авторизация'));
  }
};
