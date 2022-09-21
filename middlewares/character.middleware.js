const { Character } = require('../models/character.model');
const { CharacterImg } = require('../models/imgs.models/characterImg');
const { Movies } = require('../models/movie.model');

const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');

const characterExist = catchAsync(async function (req, _res, next) {
  const { id } = req.params;

  const characterId = await Character.findOne({
    where: { id },
    attributes: ['id', 'name', 'age', 'weigth', 'history'],
    include: [
      { model: CharacterImg, attributes: ['imgUrl'] },
      {
        model: Movies,
        through: { attributes: [] },
        attributes: ['title'],
      },
    ],
  });

  if (!characterId) {
    return next(new AppError('Id not found', 404));
  }

  req.character = characterId;
  next();
});

module.exports = { characterExist };
