const BadRequestError = require('./BadRequestError');
const ConflictError = require('./ConflictError');
const ForbiddenError = require('./ForbiddenError');
const NotFoundError = require('./NotFoundError');
const UnauthorizedError = require('./UnauthorizedError');

// Текст ошибок фильмов
const incorrectMovieDataErrorText = 'Переданы некорректные данные при добавлении фильма';
const movieNotFoundErrorText = 'Фильм с указанным _id не найден';
const insufficientRights = 'Недостаточно прав для удаления данных';
const incorrectMovieDataForDeleteErrorText = 'Переданы некорректные данные при удалении карточки с фильмом';

// Текст ошибок пользователей
const incorrectUserDataErrorText = 'Переданы некорректные данные при создании пользователя';
const conflictTextError = 'При регистрации указан email, который уже существует на сервере';
const userNotFoundErrorText = 'Пользователь с указанным _id не найден';
const incorrectUserDataForUpdateErrorText = 'Переданы некорректные данные при обновлении профиля';

// Текст общих ошибок
const unauthorizedErrorText = 'Необходима авторизация';
const serverErrorText = 'На сервере произошла ошибка';

module.exports = {
  BadRequestError,
  ConflictError,
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
  incorrectMovieDataErrorText,
  movieNotFoundErrorText,
  insufficientRights,
  incorrectMovieDataForDeleteErrorText,
  incorrectUserDataErrorText,
  conflictTextError,
  userNotFoundErrorText,
  incorrectUserDataForUpdateErrorText,
  unauthorizedErrorText,
  serverErrorText,
};
