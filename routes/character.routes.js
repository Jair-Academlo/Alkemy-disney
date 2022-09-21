//Initializing express
const express = require('express');

//controllers
const {
  createCharacter,
  getAllCharacters,
  getById,
  updateCharacter,
  deleteCharacter,
} = require('../controllers/character.controller');

//middlewares
const { characterExist } = require('../middlewares/character.middleware');
const { protectSession } = require('../middlewares/auth.middleware');

//Utils
const { upload } = require('../utils/upload');

//Routes
const router = express.Router();

router.use(protectSession);

router
  .route('/')
  .get(getAllCharacters)
  .post(upload.single('image'), createCharacter);

router
  .use('/:id', characterExist)
  .route('/:id')
  .get(getById)
  .patch(updateCharacter)
  .delete(deleteCharacter);

module.exports = { characterRouter: router };
