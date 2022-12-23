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

const Question = sequelize.define('Question', {
  product_id: DataTypes.INTEGER,
  body: DataTypes.STRING,
  date_written: DataTypes.DATE,
  asker_name: DataTypes.STRING,
  asker_email: DataTypes.STRING,
  reported: DataTypes.STRING(1),
  helpful: DataTypes.INTEGER
});

// PostgreSQL create questions table query
/* CREATE TABLE questions (
  id SERIAL PRIMARY KEY,
  product_id INT,
  body VARCHAR,
  date_written TIMESTAMPTZ,
  asker_name VARCHAR,
  asker_email VARCHAR,
  reported VARCHAR(1),
  helpful INT
);
*/

// id,product_id,body,date_written,asker_name,asker_email,reported,helpful
// 1,1,"What fabric is the top made of?",1595884714409,"yankeelover","first.last@gmail.com",0,1
// 2,1,"HEY THIS IS A WEIRD QUESTION!!!!?",1613888219613,"jbilas","first.last@gmail.com",1,4
// 3,1,"Does this product run big or small?",1608535907083,"jbilas","first.last@gmail.com",0,8
// 4,1,"How long does it last?",1594341317010,"funnygirl","first.last@gmail.com",0,6
// 5,1,"Can I wash it?",1608855284662,"cleopatra","first.last@gmail.com",0,7
// 6,1,"Is it noise cancelling?",1608855284662,"coolkid","first.last@gmail.com",1,19
// 7,2,"Where is this product made?",1590428073460,"iluvcatz","first.last@gmail.com",0,0
// 8,2,"Is this product sustainable?",1608855284662,"coolkid","first.last@gmail.com",1,5
// 9,2,"I'm allergic to dye #17, does this product contain any?",1598026382276,"l33tgamer","first.last@gmail.com",0,6

// Date format from example API response:
  // 2018-10-18T00:00:00.000Z

module.exports.Question = Question;