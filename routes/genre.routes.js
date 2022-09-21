//Initializing express
const express = require('express');

//Controllers
const { createGenre, getGenre } = require('../controllers/genre.controller');

//Middleswares

const { protectSession } = require('../middlewares/auth.middleware');
const {
  createGenreValidators,
} = require('../middlewares/validator.middleware');

//Utils
const { upload } = require('../utils/upload');

//Ruotes
const router = express.Router();

router
  .use(protectSession)
  .route('/')
  .get(getGenre)
  .post(upload.single('image'), createGenreValidators, createGenre);

module.exports = { genreRouter: router };
