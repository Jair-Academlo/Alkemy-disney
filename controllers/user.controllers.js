require('dotenv').config({ path: '../config.env' });
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Models
const { User } = require('../models/user.model');

// Utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');
const { Email } = require('../utils/email');

const signUp = catchAsync(async (req, res) => {
  const { username, email, password } = req.body;

  const salt = await bcryptjs.genSalt(12);

  const hashPassword = await bcryptjs.hash(password, salt);

  const user = await User.create({
    username,
    email,
    password: hashPassword,
  });

  user.password = undefined;

  await new Email(email).sendWelcome(username);

  res.status(201).json({
    status: 'success',
    user,
  });
});

const logIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: {
      email,
      status: 'active',
    },
  });

  if (!user) {
    return next(new AppError('Wrong credentials email', 400));
  }

  const isValidPassword = await bcryptjs.compare(password, user.password);

  if (!isValidPassword) {
    return next(new AppError('Wrong credentials password', 400));
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });

  user.password = undefined;

  res.status(200).json({
    status: 'success',
    user,
    token,
  });
});

module.exports = { signUp, logIn };
