const { db, DataTypes } = require('../utils/database');

const Genre = db.define('genre', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = { Genre };
