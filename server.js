const express = require('express');
const app = express();
require('dotenv').config();
const csv = require('csv-parser');
const fs = require('fs');
const { Question, Answer, Photo } = require('./db.js');
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// -- The rest of the routes -- //

// to get the dataValues objects into an array
  // iterate over the product questions
    // for each question object, get the dataValues object into the accumulation array

// to get the answers into the question objects, i think i need to do some
// sort of join on the questions and answers tables maybe?
  // Team.hasMany(Player);
  // Player.belongsTo(Team);

  // Team.hasMany(Player, {
  //   foreignKey: 'clubId'
  // });
  // Player.belongsTo(Team);

  // Ship.belongsTo(Captain, { foreignKey: 'bossId' });
  // ^This creates the `bossId` foreign key in Ship^
  // Ship.belongsTo(Captain, { as: 'leader' }); // using an alias with "as"

  // Question.hasMany(Answer);
  // Answer.belongsTo(Question, { as: 'question_id' });

//// ---- GET QUESTIONS (WIP)---- ////

app.get('/qa/questions', (req, res) => {
  let query = Question.findAll({
    where: {
      product_id: 37112
    }
  })
  .then((results) => {
    // console.log('product questions:', results);
    let productQuestions = results.map((question) => question.dataValues);
    console.log('results from questions query:', productQuestions);
    return productQuestions;
  })
  .then((questions) => {
    // get the answers for each question by id and add an answers property to it
    let questionsAndAnswers = questions.map((question) => {
      Answer.findAll({
        where: {
          question_id: question.id
        }
      })
      // .then(())
    })
  })
  .then(() => res.json(productQuestions))
  .catch((err) => res.sendStatus(500))
})

//// ---- GET ANSWERS (WIP) ---- ////

app.get('/qa/questions/:question_id/answers', (req, res) => {
  let answersResult;
  return Answer.findAll({
    where: {
      question_id: 130461
    }
  })
  .then((answers) => {
    // console.log('answers:', answers);
    // answers.map((answer) => answer.dataValues);
    // console.log('from answers query:', answers[0].dataValues);
    answersResult = answers.map((answer) => answer.dataValues);
    console.log('answersResult:', answersResult);
    return answersResult;
  })
  .then((answers) => (
    // console.log('answers:', answers)
    // console.log('answers.id:', answers.id)
    // loop over answers to add each photo array to them as a property
    answers.map((answer) => {
      // console.log('answer in map:', answer)
      let id = answer.id
      Photo.findAll({
        attributes: ['id', 'url'],
        where: {
          answer_id: id
        }
      })
      .then((photos) => {
        let photoData = photos.map((photoObject) => {
          if (photoObject.dataValues) {
            console.log('[photoObject.dataValues]:', [photoObject.dataValues])
            return [photoObject.dataValues];
          } else {
            return [];
          }
        })
        return photoData;
      })
      .then((photoData) => (
        answer.photos = photoData
      ))
      return answer;
    })
  ))
  .then((answersWithPhotos) => {
    console.log('answersWithPhotos:', answersWithPhotos)
    // photos.map((photo) => photo.dataValues)
  })
  .then(() => console.log('====ungabunga===='))
  .then((photosData) => answersResult.photos = photosData)
  .then(() => res.json(answersResult))
  .catch(() => res.sendStatus(500))
})

//// ---- ADD QUESTION ---- ////

app.post('/qa/questions', (req, res) => {
  async function addQuestion(params) {
    try {
      await Question.create(params)
    } catch (err) {
      console.log('Error adding question to database:', err);
    }
  }
  addQuestion(req.body);
  res.send()
})

//// ---- ADD ANSWER ---- ////

app.post('/qa/questions/:question_id/answers', (req, res) => {
  console.log('POSTING AN ANSWER');
  console.log('req.body answer:', req.body);
  let answerPhotos = req.body.photos;
  let answerParams = req.body;
  delete answerParams.photos;
  async function addAnswer(params) {
    try {
      console.log('answer params:', answerParams);
      await Answer.create(params)
    } catch (err) {
      console.log('Error adding answer to database:', err);
    }
  }
  addAnswer(answerParams);
  res.send();
})

//// ---- MARK QUESTION HELPFUL ---- ////

app.put('/qa/questions/:question_id/helpful', (req, res) => {
  // query the database for the question and change the value under helpful
    // to be itself plus 1
  async function markQuestionHelpful(question_id) {
    try {
      let question = await Question.findByPk(question_id)

      let helpfulScore = question.dataValues.helpful;

      await Question.update({helpful: helpfulScore+1}, {
        where: {
          question_id: question_id
        }
      })
    } catch (err) {
      console.log('Error marking question as helpful:', err);
    }
  }
  markQuestionHelpful(req.params.question_id);
  res.send();
})

//// ---- REPORT QUESTION ---- ////

app.put('/qa/questions/:question_id/report', (req, res) => {
  async function reportQuestion(question_id) {
    try {
      await Question.update({reported: '1'}, {
        where: {
          question_id: question_id
        }
      })
    } catch (err) {
      console.log('Error reporting question:', err);
    }
  }
  reportQuestion(req.params.question_id);
  res.send();
})

//// ---- MARK ANSWER HELPFUL ---- ////

app.put('/qa/answers/:answer_id/helpful', (req, res) => {
  async function markAnswerHelpful(answer_id) {
    try {
      let answer = await Answer.findByPk(answer_id)

      let helpfulScore = answer.dataValues.helpful;

      await Answer.update({helpful: helpfulScore+1}, {
        where: {
          answer_id: answer_id
        }
      })
    } catch (err) {
      console.log('Error marking answer as helpful:', err);
    }
  }
  markAnswerHelpful(req.params.answer_id);
  res.send();
})

//// ---- REPORT ANSWER ---- ////

app.put('/qa/answers/:answer_id/report', (req, res) => {
  async function reportAnswer(answer_id) {
    try {
      await Answer.update({reported: '1'}, {
        where: {
          answer_id: answer_id
        }
      })
    } catch (err) {
      console.log('Error reporting answer:', err);
    }
  }
  reportAnswer(req.params.answer_id);
  res.send();
})

app.listen(process.env.PORT);
console.log(`Listening on PORT ${process.env.PORT}`);
