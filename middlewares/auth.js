const jwt = require('jsonwebtoken');
const ForbiddenError = require('../errors/forbidden-error');

module.exports = (req, res, next) => {
  const { token } = req.cookies;

  try {
    const payload = jwt.verify(token, 'some-secret-key');
    req.user = payload;

    next();
  } catch (err) {
    next(new ForbiddenError('Необходима авторизация'));
  }
};
