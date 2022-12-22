const { Sequelize } = require('sequelize');
require('dotenv').config();

const user = 'postgres';
const host = 'localhost';
const database = 'mydb';
const password = 'password1';
const port = '5432';

const sequelize = new Sequelize(database, user, password, {
  host,
  port,
  dialect: 'postgres',
  logging: false
});


async function testConnection () {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testConnection();