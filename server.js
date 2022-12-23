const express = require('express');
const app = express();
require('dotenv').config();
const csv = require('csv-parser');
const fs = require('fs');
const { Question } = require('./db.js');

const results = [];

const convertDate = (data) => {
  data.forEach((question) => {
    question.date_written = new Date(Number(question.date_written));
  });
  return data;
}

fs.createReadStream('questions.csv', {
  start: 0,
  end: 427
  })
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    convertDate(results);
    seedDB(results);
});

let questions;

async function seedDB(data) {
  try {
    await Question.sync();
    questions = await Question.bulkCreate(data);
  } catch (error) {
    console.log('Error seeding PostgreSQL database...', error);
  }
};

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(process.env.PORT);
console.log(`Listening on PORT ${process.env.PORT}`);
