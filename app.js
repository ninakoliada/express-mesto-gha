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

app.use((req, res) => {
  res.status(404).send({ message: 'Не найдено' });
});

app.use(errors());

app.use((error, _req, res, _next) => {
  if (error.name === 'ValidationError') {
    return res.status(400).send({ message: 'Некорректные данные' });
  }

  if (error.name === 'CastError') {
    return res.status(400).send({ message: 'Невалидный id' });
  }

  return res.status(error.statusCode || 500).send({ message: error.message || 'Что-то пошло не так' });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
