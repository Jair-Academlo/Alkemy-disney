//Initializing express
const express = require('express');

//controllers
const { signUp, logIn } = require('../controllers/user.controllers');

// middlewares
const { createUserValidators } = require('../middlewares/validator.middleware');

const router = express.Router();

router.post('/auth/register', createUserValidators, signUp);
router.post('/auth/login', logIn);

module.exports = { userRouter: router };
