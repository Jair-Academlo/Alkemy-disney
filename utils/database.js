const { Sequelize, DataTypes } = require('sequelize');

require('dotenv').config({ path: './config.env' });

//create Database
const db = new Sequelize({
  dialect: 'postgres',
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB,
  logging: false,
});

module.exports = { db, DataTypes };
