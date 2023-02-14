require('dotenv').config();
const express = require('express');
const {
  retrieveQuestionsByProductId,
  retrieveAnswersByQuestionID,
  addQuestion,
  addAnswer,
  markQuestionAsHelpful,
  reportQuestion
 } = require('./controllers/questions')


const app = express();
app.use(express.json());

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const mongoDB = process.env.DATABASE_URL
mongoose.connect(mongoDB)
.then( () => {
  console.log('database connection successful!');
})
.catch ( (err) => {
  console.log(err);
})

app.get('/hb', (req, res) => {
  console.log('working')
})

// LIST QUESTIONS
app.get('/qa/questions', (req, res) => {
  retrieveQuestionsByProductId(req, res)
});

// ANSWERS LIST
app.get('/qa/questions/:question_id/answers', (req, res) => {
  retrieveAnswersByQuestionID(req, res)
});

// ADD QUESTION
app.post('/qa/questions', (req, res) => {
  addQuestion(req, res)
})

//ADD ANSWER
app.post('/qa/questions/:question_id/answers', (req, res) => {
  addAnswer(req, res)
});

// MARK QUESTION AS HELPFUL
app.put('/qa/questions/:question_id/helpful', (req, res) => {
  markQuestionAsHelpful(req, res)
})

//REPORT QUESTION
app.put('/qa/questions/:question_id/report', (req, res) => {
  reportQuestion(req, res)
})

// app.get(`/loaderio-d9da2cf15d34431d97bfc3ab21ffec9c/`, (req, res) => {
//   // access the loader.io token file
//   res.send('loaderio-d9da2cf15d34431d97bfc3ab21ffec9c')
// });

app.listen(8080, () => {
  console.log('listening on port 8080')
})



