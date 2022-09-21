//Firebase
const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');

//Models
const { Movies } = require('../models/movie.model');
const { CharacterMovies } = require('../models/characterMovie.model');
const { MovieImg } = require('../models/imgs.models/movieImg');
const { Character } = require('../models/character.model');
const { Genre } = require('../models/genre.model');

//Utils
const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');
const { storage } = require('../utils/firebase');
const { GenreImg } = require('../models/imgs.models/genreImg');

//Funtions Controllers
const getMovies = catchAsync(async function (req, res) {
  const { name, genre, order } = req.query;

  if (name) {
    const moviesByName = await Movies.findAll({
      where: { title: name },
      attributes: ['title', 'creationDate'],
      include: [
        { model: MovieImg, attributes: ['imgUrl'] },
        { model: Genre, attributes: ['title'] },
        {
          model: Character,
          attributes: ['name', 'age', 'weigth', 'history'],
        },
      ],
    });
    if (!moviesByName) return res.status(404).json({ error: 'no movie found' });
    return res.status(200).json(moviesByName);
  }
  if (genre) {
    const moviesByGenre = await Movies.findAll({
      where: { genreId: genre },
      attributes: ['title', 'creationDate'],
      include: [
        { model: MovieImg, attributes: ['imgUrl'] },
        {
          model: Genre,
          attributes: ['title'],
          include: { model: GenreImg, attributes: ['imgUrl'] },
        },
        {
          model: Character,
          attributes: ['name', 'age', 'weigth', 'history'],
        },
      ],
    });
    if (!moviesByGenre)
      return res.status(404).json({ error: 'no movie found' });
    return res.status(200).json(moviesByGenre);
  }
  if (order) {
    const moviesByOrder = await Movies.findAll({
      order: [['title', order]],
      attributes: ['title', 'creationDate'],
      include: { model: MovieImg, attributes: ['imgUrl'] },
    });
    return res.status(200).json(moviesByOrder);
  }
  const movies = await Movies.findAll({
    attributes: ['title', 'creationDate'],
    include: [
      { model: MovieImg, attributes: ['imgUrl'] },
      {
        model: Genre,
        attributes: ['title'],
        include: { model: GenreImg, attributes: ['imgUrl'] },
      },
      {
        model: Character,
        attributes: ['name', 'age', 'weigth', 'history'],
      },
    ],
  });
  res.status(200).json(movies);
});

const createMovie = catchAsync(async function (req, res) {
  const newMovie = await Movies.create(req.body);

  if (req.files.length > 0) {
    const filesPromises = req.files.map(async file => {
      const imgRef = ref(storage, `movies/${Date.now()}_${file.originalname}`);
      const imgRes = await uploadBytes(imgRef, file.buffer);

      return await MovieImg.create({
        movieId: newMovie.id,
        imgUrl: imgRes.metadata.fullPath,
      });
    });

    await Promise.all(filesPromises);
  }

  res.status(201).json({ message: 'Movie created', newMovie });
});

const movieById = catchAsync(async function (req, res) {
  const { movie } = req;

  res.status(202).json({ status: 'success', movie });
});

const updateMovie = catchAsync(async function (req, res) {
  const { movie } = req;

  await movie.update(req.body);

  res.status(202).json({ message: 'Movie Updated', movie });
});

const deletemovie = catchAsync(async function (req, res) {
  const { movie } = req;

  await movie.destroy();

  res.status(200).json({ message: 'Movie deleted', movie });
});

const assignMovie = catchAsync(async (req, res) => {
  const { characterId, movieId } = req.body;

  const characterInMovie = await CharacterMovies.create({
    characterId,
    movieId,
  });

  res.status(201).json({
    status: 'success',
    characterInMovie,
  });
});

module.exports = {
  getMovies,
  createMovie,
  movieById,
  updateMovie,
  deletemovie,
  assignMovie,
};
