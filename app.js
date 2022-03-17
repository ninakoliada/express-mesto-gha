const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, _res, next) => {
  req.user = {
    _id: '62333802d9a0c5f237f36999',
  };

  next();
});

app.use(usersRouter);
app.use(cardsRouter);

app.use((error, _req, res, _next) => {
  if (error.name === 'ValidationError') {
    return res.status(400).send({ message: 'Некорректные данные' });
  }

  return res.status(500).send({ message: 'Что-то пошло не так' });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
