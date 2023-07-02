const Movie = require('../models/movie');
const { STATUS_CODES } = require('../utils/constants');
const {
  BadRequestError,
  NotFoundError,
  ForbiddenError,
} = require('../utils/errors/errors');

const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.status(STATUS_CODES.OK).send(movies))
    .catch(next);
};

const addMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  return Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => res.status(STATUS_CODES.CREATED).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Переданы некорректные данные при добавлении фильма'));
      }
      return next(err);
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .orFail(new NotFoundError('Карточка с указанным _id не найдена'))
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Попытка удалить чужую карточку с фильмом');
      }
      Movie.findByIdAndRemove(req.params.cardId)
        .then(() => res.send({ message: 'Фильм удален' }))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return next(new BadRequestError(' Переданы некорректные данные при удалении карточки с фильмом'));
      }
      return next(err);
    });
};

module.exports = {
  getMovies,
  addMovie,
  deleteMovie,
};
