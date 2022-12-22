const { Sequelize } = require('sequelize');
require('dotenv').config();

// File for PostgreSQL database

// Connection URI templates:
// postgresql://host:port/database
// postgres://user:pass@example.com:5432/dbname

const sequelize = new Sequelize(`postgresql://localhost:${process.env.PORT}/mydb`);

try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}