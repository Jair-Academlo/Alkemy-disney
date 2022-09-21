//Firebase
const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');

//Models
const { Character } = require('../models/character.model');
const { Movies } = require('../models/movie.model');
const { CharacterImg } = require('../models/imgs.models/characterImg');

//Utils
const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');
const { storage } = require('../utils/firebase');

//Funtions Controllers

const getAllCharacters = catchAsync(async function (req, res, next) {
  const { name, age, weigth, movies } = req.query;

  const allCharacters = await Character.findAll();

  switch (name || age || weigth || movies || '') {
    case name:
      const searchByName = await Character.findAll({
        where: { name },
        attributes: ['name'],
        include: { model: CharacterImg, attributes: ['imgUrl'] },
      });

      res.status(200).json(searchByName);

      break;
    case age:
      const searchByAge = await Character.findAll({
        where: { age },
        attributes: ['name'],
        include: { model: CharacterImg, attributes: ['imgUrl'] },
      });

      res.status(200).json(searchByAge);

      break;

    case movies:
      const searchByMovie = await Character.findAll({
        where: { id: movies },
        attributes: ['name'],
        include: [
          { model: CharacterImg, attributes: ['imgUrl'] },
          {
            model: Movies,
            attributes: ['title'],
            through: { attributes: [] },
          },
        ],
      });

      res.status(200).json(searchByMovie);

      break;

    case weigth:
      const searchByWeigth = await Character.findAll({
        where: { weigth },
        attributes: ['name'],
        include: { model: CharacterImg, attributes: ['imgUrl'] },
      });

      res.status(200).json(searchByWeigth);

    default:
      if (!['name', 'age', 'weigth', 'movies'].includes(allCharacters)) {
        return next(new AppError('Dates not found', 404));
      }
      break;
  }
});

const getById = catchAsync(async function (req, res) {
  const { character } = req;

  const imgRef = ref(storage, character.characterImgs[0].imgUrl);

  const imgFull = await getDownloadURL(imgRef);

  character.characterImgs[0].imgUrl = imgFull;

  res.status(200).json(character);
});

const createCharacter = catchAsync(async function (req, res, next) {
  const { name, age, weigth, history, userId, movieId, image } = req.body;
  const { sessionUser } = req;

  const imgRef = ref(
    storage,
    `characters/${Date.now()}-${req.file.originalname}`
  );

  const imgRes = await uploadBytes(imgRef, req.file.buffer);

  const newCharacter = await Character.create({
    name,
    age,
    weigth,
    history,
    userId: sessionUser.id,
    movieId,
    image,
  });

  await CharacterImg.create({
    characterId: newCharacter.id,
    imgUrl: imgRes.metadata.fullPath,
  });

  res.status(201).json({
    message: 'Character created',
    status: 'success',
    newCharacter,
  });
});

const updateCharacter = catchAsync(async function (req, res) {
  const { character } = req;

  await character.update(req.body);

  res.status(200).json({ status: 'success', character });
});

const deleteCharacter = catchAsync(async function (req, res) {
  const { character } = req;

  await character.destroy();

  res.status(200).json({ message: 'Character deleted' });
});
module.exports = {
  getAllCharacters,
  getById,
  createCharacter,
  updateCharacter,
  deleteCharacter,
};
