const router = require('express').Router();
const {
  getMovies,
  addMovie,
  deleteMovie,
} = require('../controllers/movies');

const {
  addMovieValidator,
  movieIdValidator,
} = require('../middlewares/validation');

router.get('/', getMovies);
router.post('/', addMovieValidator, addMovie);
router.delete('/:_id', movieIdValidator, deleteMovie);

module.exports = router;
