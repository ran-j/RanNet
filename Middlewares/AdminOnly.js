var createError = require('http-errors');

const AdminOnly = (req, res, next) => {
  if (req.session && req.session.admin) {
    return next();
  } else {
    next(createError(403));
  }
}

module.exports = AdminOnly;
