const { DataTypes, db } = require('../utils/database');

const Movies = db.define('movie', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  title: {
    allowNull: false,
    type: DataTypes.STRING,
  },

  creationDate: {
    allowNull: false,
    type: DataTypes.DATEONLY,
  },
  qualification: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  genreId: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
});

module.exports = { Movies };
