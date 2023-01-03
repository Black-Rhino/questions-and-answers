// *** SEED DATABASE ONLY WHEN IT IS EMPTY ***//

const csv = require('csv-parser');
const fs = require('fs');
const { Question, Answer, Photo } = require('./db.js');

// Date conversion function for questions and answers tables
const convertDate = (data) => {
  data.forEach((object) => {
    object.date_written = new Date(Number(object.date_written));
  });
  return data;
}

// Create and seed questions table
// const questionsData = [];

// fs.createReadStream('questions.csv')
//   .pipe(csv())
//   .on('data', (data) => questionsData.push(data))
//   .on('end', () => {
//     console.log(questionsData);
//     convertDate(questionsData);
//     seedDB(questionsData);
// });

// let questions;

// async function seedDB(data) {
//   try {
//     await Question.sync();
//     let firstQuarterIndexEnd = Math.round(data.length / 4);
//     let secondQuarterIndexEnd = firstQuarterIndexEnd * 2;
//     let thirdQuarterIndexEnd = firstQuarterIndexEnd * 3;
//     let firstQuarter = data.slice(0, firstQuarterIndexEnd);
//     let secondQuarter = data.slice(firstQuarterIndexEnd + 1, secondQuarterIndexEnd);
//     let thirdQuarter = data.slice(secondQuarterIndexEnd + 1, thirdQuarterIndexEnd);
//     let fourthQuarter = data.slice(thirdQuarterIndexEnd + 1);
//     questions = await Question.bulkCreate(firstQuarter);
//     questions = await Question.bulkCreate(secondQuarter);
//     questions = await Question.bulkCreate(thirdQuarter);
//     questions = await Question.bulkCreate(fourthQuarter);
//   } catch (error) {
//     console.log('Error seeding PostgreSQL database...', error);
//   }
// };

// Create and seed answers table
// const answersData = [];

// fs.createReadStream('answers.csv')
//   .pipe(csv())
//   .on('data', (data) => answersData.push(data))
//   .on('end', () => {
//     console.log(answersData);
//     convertDate(answersData);
//     seedDB(answersData);
// });

// let answers;

// async function seedDB(data) {
//   try {
//     await Answer.sync();
//     let firstQuarterIndexEnd = Math.round(data.length / 4);
//     let secondQuarterIndexEnd = firstQuarterIndexEnd * 2;
//     let thirdQuarterIndexEnd = firstQuarterIndexEnd * 3;
//     let firstQuarter = data.slice(0, firstQuarterIndexEnd);
//     let secondQuarter = data.slice(firstQuarterIndexEnd + 1, secondQuarterIndexEnd);
//     let thirdQuarter = data.slice(secondQuarterIndexEnd + 1, thirdQuarterIndexEnd);
//     let fourthQuarter = data.slice(thirdQuarterIndexEnd + 1);
//     answers = await Answer.bulkCreate(firstQuarter);
//     answers = await Answer.bulkCreate(secondQuarter);
//     answers = await Answer.bulkCreate(thirdQuarter);
//     answers = await Answer.bulkCreate(fourthQuarter);
//   } catch (error) {
//     console.log('Error seeding PostgreSQL database...', error);
//   }
// };

// Create and seed photos table
// const photosData = [];

// fs.createReadStream('answers_photos.csv')
//   .pipe(csv())
//   .on('data', (data) => photosData.push(data))
//   .on('end', () => {
//     console.log(photosData);
//     seedDB(photosData);
// });

// let photos;

// async function seedDB(data) {
//   try {
//     await Photo.sync();
//     let firstQuarterIndexEnd = Math.round(data.length / 4);
//     let secondQuarterIndexEnd = firstQuarterIndexEnd * 2;
//     let thirdQuarterIndexEnd = firstQuarterIndexEnd * 3;
//     let firstQuarter = data.slice(0, firstQuarterIndexEnd);
//     let secondQuarter = data.slice(firstQuarterIndexEnd + 1, secondQuarterIndexEnd);
//     let thirdQuarter = data.slice(secondQuarterIndexEnd + 1, thirdQuarterIndexEnd);
//     let fourthQuarter = data.slice(thirdQuarterIndexEnd + 1);
//     photos = await Photo.bulkCreate(firstQuarter);
//     photos = await Photo.bulkCreate(secondQuarter);
//     photos = await Photo.bulkCreate(thirdQuarter);
//     photos = await Photo.bulkCreate(fourthQuarter);
//   } catch (error) {
//     console.log('Error seeding PostgreSQL database...', error);
//   }
// };
