//Modles
const { Movies } = require('../models/movie.model');
const { Character } = require('../models/character.model');

//Utils
const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');
const { MovieImg } = require('../models/imgs.models/movieImg');

const moviesExist = catchAsync(async (req, _res, next) => {
  const { id } = req.params;

  const movieId = await Movies.findOne({
    where: { id },

    attributes: ['id', 'title', 'creationDate', 'qualification'],
    include: [
      { model: MovieImg, attributes: ['imgUrl'] },
      { model: Character, attributes: ['name', 'history'] },
    ],
  });

  if (!movieId) {
    return next(new AppError('Id not found', 404));
  }

  req.movie = movieId;
  next();
});

module.exports = { moviesExist };
