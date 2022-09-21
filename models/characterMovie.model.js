const { db, DataTypes } = require('../utils/database');
const { Character } = require('./character.model');
const { Movies } = require('./movie.model');

const CharacterMovies = db.define('characterMovies', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  characterId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Character,
      key: 'id',
    },
  },
  movieId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Movies,
      key: 'id',
    },
  },
});

module.exports = { CharacterMovies };
