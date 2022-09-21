//Firebase
const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');

//Models
const { Genre } = require('../models/genre.model');
const { Movies } = require('../models/movie.model');
const { Character } = require('../models/character.model');
const { GenreImg } = require('../models/imgs.models/genreImg');

//Utils
const { catchAsync } = require('../utils/catchAsync');
const { storage } = require('../utils/firebase');

//Funtions Controllers
const createGenre = catchAsync(async function (req, res) {
  const newGenre = await Genre.create(req.body);

  const imgRef = ref(storage, `genre/${Date.now()}-${req.file.originalname}`);

  const imgRes = await uploadBytes(imgRef, req.file.buffer);

  await GenreImg.create({
    genreId: newGenre.id,
    imgUrl: imgRes.metadata.fullPath,
  });

  res.status(201).json({ message: 'Genre created', newGenre });
});

const getGenre = catchAsync(async function (req, res) {
  const allGenre = await Genre.findAll({
    attributes: ['id', 'title'],
    include: [
      { model: GenreImg, attributes: ['imgUrl'] },
      {
        model: Movies,
        attributes: ['title', 'creationDate', 'qualification', 'genreId'],
        include: [
          {
            model: Character,
            attributes: ['name', 'age', 'weigth', 'history'],
          },
        ],
      },
    ],
  });

  res.status(200).json({ status: 'success', allGenre });
});

module.exports = { createGenre, getGenre };
