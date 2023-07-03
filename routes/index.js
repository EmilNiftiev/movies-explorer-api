const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const auth = require('../middlewares/auth');
const { signinValidator, signupValidator } = require('../middlewares/validation');
const { login, createUser } = require('../controllers/users');
const { NotFoundError } = require('../utils/errors/errors');

router.post('/signin', signinValidator, login);
router.post('/signup', signupValidator, createUser);

router.use(auth);

router.use('/users', userRouter);
router.use('/movies', movieRouter);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Такой страницы не существует'));
});

module.exports = router;
