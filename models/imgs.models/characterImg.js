const { db, DataTypes } = require('../../utils/database');

const CharacterImg = db.define('characterImg', {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
  },
  characterId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  imgUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = { CharacterImg };
