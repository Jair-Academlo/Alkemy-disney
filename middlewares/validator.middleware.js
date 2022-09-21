const { body, validationResult } = require('express-validator');

// Utils
const { AppError } = require('../utils/appError');

const checkResult = (req, _res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const msg = errors
      .array()
      .map(error => error.msg)
      .join('. ');

    return next(new AppError(msg, 400));
  }

  next();
};

const createUserValidators = [
  body('username').notEmpty().withMessage('The username is requered'),
  body('email')
    .notEmpty()
    .withMessage('The email is required')
    .isEmail()
    .withMessage('Provide a valid email'),
  body('password')
    .notEmpty()
    .withMessage('The password is required')
    .isLength({ min: 8 })
    .withMessage('The password must be at last 8 character long')
    .isAlphanumeric()
    .withMessage('The password must include letters and numbers'),
  checkResult,
];

const createMoviesValidators = [
  body('title').notEmpty().withMessage('The Title is requered'),
  body('creationDate')
    .notEmpty()
    .withMessage('the date is required')
    .matches(/\d{4}-\d{2}-\d{2}/)
    .withMessage('the date format must be  YYYY-MM-DD'),
  body('qualification')
    .notEmpty()
    .withMessage('The qualification is required')
    .isNumeric()
    .withMessage('id must be a number')
    .isInt({ min: 1, max: 5 })
    .withMessage('qualification must be an integer from 1 to 5'),
  checkResult,
];

const createGenreValidators = [
  body('title').notEmpty().withMessage('The Title is requered'),
  checkResult,
];

module.exports = {
  createUserValidators,
  createMoviesValidators,
  createGenreValidators,
};
