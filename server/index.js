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

const mongoDB = 'mongodb://localhost/SDC'
mongoose.connect(mongoDB)
.then( () => {
  console.log('database connection successful!');
})
.catch ( (err) => {
  console.log(err);
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


app.listen(8080, () => {
  console.log('listening on port 8080')
})

