const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const { errors } = require('celebrate');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const { login, createUser } = require('./controllers/users');

const auth = require('./middlewares/auth');
const { createUserValidator, loginValidator } = require('./validators/userValidator');
const NotFoundError = require('./errors/not-found-error');
const BadRequestError = require('./errors/bad-request-error');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.post('/signin', loginValidator, login);
app.post('/signup', createUserValidator, createUser);

app.use(auth);

app.use(usersRouter);
app.use(cardsRouter);

app.use((req, res, next) => {
  next(new NotFoundError('Не найдено'));
});

app.use(errors());

app.use((error, req, res, next) => {
  if (error.name === 'ValidationError') {
    return next(new BadRequestError('Некорректные данные'));
  }

  if (error.name === 'CastError') {
    return next(new BadRequestError('Невалидный id'));
  }

  return next(error);
});

app.use((error, req, res, _next) => {
  const { statusCode = 500, message = 'Что-то пошло не так' } = error;

  return res.status(statusCode).send({ message });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
