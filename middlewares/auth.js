const jwt = require('jsonwebtoken');
const {
  UnauthorizedError,
  unauthorizedErrorText,
} = require('../utils/errors/errors');

const { NODE_ENV, JWT_SECRET = 'JWT_SECRET' } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError(unauthorizedErrorText);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    throw new UnauthorizedError(unauthorizedErrorText);
  }

  req.user = payload;
  next();
};
