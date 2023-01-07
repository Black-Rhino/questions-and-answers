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

//// ---- GET QUESTIONS to a product (WIP)---- ////

app.get('/qa/questions/:product_id', (req, res) => {
  let query = Question.findAll({
    where: {
      product_id: req.params.product_id
    }
  })
  .then((results) => {
    let productQuestions = results.map((question) => question.dataValues);
    return productQuestions;
  })
  .then((productQuestions) => res.json(productQuestions))
  .catch((err) => {
    console.log('Error getting questions', err)
    res.sendStatus(500)
  })
})

//// ---- GET ANSWERS to a question (WIP) ---- ////

app.get('/qa/questions/:question_id/answers', (req, res) => {
  let answers = Answer.findAll({
    where: {
      question_id: req.params.question_id
    }
  })
  .then((answers) => {
    let mappedAnswers = answers.map((answer) => answer.dataValues);
    return mappedAnswers;
  })
  .then((questionAnswers) => res.json(questionAnswers))
  .catch(() => res.sendStatus(500))
})

//// ---- ADD QUESTION ---- ////

app.post('/qa/questions', (req, res) => {
  console.log('add question params:', req.body);
  async function addQuestion(params) {
    try {
      let maxId = await Question.max('id');
      console.log('maxId:', maxId);
      params.id = maxId + 1;

      await Question.create(params, {
        benchmark: true,
        logging: console.log
      })
    } catch (err) {
      console.log('Error adding question to database:', err);
    }
  }
  addQuestion(req.body);
  res.send()
})

//// ---- ADD ANSWER ---- ////

app.post('/qa/questions/:question_id/answers', (req, res) => {
  let answerPhotos = req.body.photos;
  let answerParams = req.body;
  delete answerParams.photos;
  async function addAnswer(params) {
    try {
      params.question_id = parseInt(req.params.question_id);
      let maxId = await Answer.max('id');
      params.id = maxId + 1;

      await Answer.create(params, {
        benchmark: true,
        logging: console.log
      })
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
          id: question_id
        },
        benchmark: true,
        logging: console.log
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
          id: question_id
        },
        benchmark: true,
        logging: console.log
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
          id: answer_id
        },
        benchmark: true,
        logging: console.log
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
          id: answer_id
        },
        benchmark: true,
        logging: console.log
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
