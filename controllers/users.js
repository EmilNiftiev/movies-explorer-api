const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { STATUS_CODES } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET = 'JWT_SECRET' } = process.env;

const {
  ConflictError,
  BadRequestError,
  NotFoundError,
  incorrectUserDataErrorText,
  conflictTextError,
  userNotFoundErrorText,
  incorrectUserDataForUpdateErrorText,
} = require('../utils/errors/errors');

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    }))
    .then(() => res.status(STATUS_CODES.CREATED)
      .send({
        name,
        email,
      }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(incorrectUserDataErrorText));
      }
      if (err.code === 11000) {
        return next(new ConflictError(conflictTextError));
      }
      return next(err);
    });
};

const updateUser = (req, res, next) => {
  const { email, name } = req.body;

  return User.findByIdAndUpdate(req.user._id, { email, name }, { new: true })
    .orFail(new NotFoundError(userNotFoundErrorText)) // Если ошибка, сразу попадаем в блок Catch
    .then((user) => {
      res.status(STATUS_CODES.OK).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(incorrectUserDataForUpdateErrorText));
      }
      return next(err);
    });
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError(userNotFoundErrorText);
    })
    .then((user) => res.send(user))
    .catch(next);
};

module.exports = {
  login,
  createUser,
  updateUser,
  getCurrentUser,
};
