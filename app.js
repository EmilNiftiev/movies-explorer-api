require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const errorHandler = require('./middlewares/errorHandler');
const router = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/limiter');

const { PORT: DEFAULT_PORT } = require('./utils/constants');
const { PORT = DEFAULT_PORT, MONGO_URL = 'MONGO_URL', NODE_ENV } = process.env;
const { dbUrl } = require('./utils/constants');
// Если файл .env отсутствует, берем альтернативные значения из констант

const app = express();
app.use(cors());

mongoose
  .connect(NODE_ENV === 'production' ? MONGO_URL : dbUrl)
  .then(() => console.log('БД подключена'))
  .catch((err) => console.log('Ошбика подключения к БД', err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(limiter); // Ограничиваем число запросов в единицу времени

app.use(helmet()); // Набор middleware-функций для защиты от веб-уязвимостей

app.use(requestLogger); // Логгер запросов

app.use(router); // все роуты из директории routes

app.use(errorLogger); // Логгер ошибок

app.use(errors()); // Миддлвэр errors, чтобы отправить клиенту ошибку
app.use(errorHandler); // Наш централизованный обработчик ошибок

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
