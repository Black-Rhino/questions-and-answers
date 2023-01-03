const { Sequelize, DataTypes } = require('sequelize');
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

// --- Questions schema --- //

const Question = sequelize.define('Question', {
  product_id: {type: DataTypes.INTEGER, allowNull: false},
  body: {type: DataTypes.STRING},
  date_written: {type: DataTypes.DATE},
  asker_name: {type: DataTypes.STRING},
  asker_email: {type: DataTypes.STRING},
  reported: {type: DataTypes.STRING},
  helpful: {type: DataTypes.INTEGER}
}, {
  tableName: 'questions',
  timestamps: false;
});

// --- Answers schema --- //

const Answer = sequelize.define('Answer', {
  question_id: {type: DataTypes.INTEGER, allowNull: false},
  body: {type: DataTypes.STRING},
  date_written: {type: DataTypes.DATE},
  answerer_name: {type: DataTypes.STRING},
  answerer_email: {type: DataTypes.STRING},
  reported: {type: DataTypes.STRING},
  helpful: {type: DataTypes.INTEGER}
}, {
  tableName: 'answers',
  timestamps: false;
});

// --- Photos schema --- //

const Photo = sequelize.define('Photo', {
  answer_id: {type: DataTypes.INTEGER, allowNull: false},
  url: {type: DataTypes.STRING}
}, {
  tableName: 'photos',
  timestamps: false;
});

module.exports.Question = Question;
module.exports.Answer = Answer;
module.exports.Photo = Photo;