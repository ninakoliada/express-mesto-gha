const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const { token } = req.cookies;

  try {
    const payload = jwt.verify(token, 'some-secret-key');
    req.user = payload;

    next();
  } catch (err) {
    res.status(401).send({ message: 'Необходима авторизация' });
  }
};
