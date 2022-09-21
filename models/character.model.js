const { db, DataTypes } = require('../utils/database');

const Character = db.define('character', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  weigth: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  history: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  movieId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

module.exports = { Character };
