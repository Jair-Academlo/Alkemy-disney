//Initializing express
const express = require('express');

//Controllers
const {
  getMovies,
  createMovie,
  movieById,
  updateMovie,
  deletemovie,
  assignMovie,
} = require('../controllers/movie.controller');

//Middlewares
const { moviesExist } = require('../middlewares/movie.middleware');
const { protectSession } = require('../middlewares/auth.middleware');
const {
  createMoviesValidators,
} = require('../middlewares/validator.middleware');

//Utils
const { upload } = require('../utils/upload');

//Routes
const router = express.Router();

router.use(protectSession);

router
  .route('/')
  .get(getMovies)
  .post(upload.array('images', 3), createMoviesValidators, createMovie);

router.post('/assingMovie', assignMovie);

router
  .use('/:id', moviesExist)
  .route('/:id')
  .get(movieById)
  .patch(updateMovie)
  .delete(deletemovie);

module.exports = { movieRouter: router };
