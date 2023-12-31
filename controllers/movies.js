const Movie = require('../models/movie');
const { STATUS_CODES } = require('../utils/constants');
const {
  BadRequestError,
  NotFoundError,
  ForbiddenError,
  incorrectMovieDataErrorText,
  movieNotFoundErrorText,
  insufficientRights,
  incorrectMovieDataForDeleteErrorText,
} = require('../utils/errors/errors');

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
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
        return next(new BadRequestError(incorrectMovieDataErrorText));
      }
      return next(err);
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(new NotFoundError(movieNotFoundErrorText))
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError(insufficientRights);
      }
      Movie.findByIdAndRemove(req.params.movieId)
        .then(() => res.send({ message: 'Фильм удален' }))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return next(new BadRequestError(incorrectMovieDataForDeleteErrorText));
      }
      return next(err);
    });
};

module.exports = {
  getMovies,
  addMovie,
  deleteMovie,
};
