const csv = require('csv-parser');
const fs = require('fs');
const { Question } = require('./db.js');

// Create and seed questions table
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
    console.log(results);
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
