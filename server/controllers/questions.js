const express = require('express');
const Question = require('../models/Question');

// GET QUESTIONS
exports.retrieveQuestionsByProductId = (req, res) => {

  Question.find({product_id: req.query.product_id})
  .then ( (results) => {
    res.send(results);
  })
  .catch( (err) => {
    console.log(err)
  });

}

// GET ANSWERS
exports.retrieveAnswersByQuestionID = (req, res) => {

  Question.find( {question_id: req.params.question_id}, {answers: true} )
  .then ( (results) => {
    // console.log(results[0].answers)
    res.send(results[0].answers);
  })
  .catch( (err) => {
    console.log(err)
  });

}

// MARK QUESTION AS HELPFUL
exports.markQuestionAsHelpful = (req, res) => {

  Question.findOneAndUpdate({question_id: req.params.question_id}, {$inc: {'question_helpfulness': 1}})
  .then ( (results) => {
    res.send(results)
  })
  .catch ( (err) => {
    console.log(err)
  })
}

// REPORT QUESTION
exports.reportQuestion = (req, res) => {
  Question.findOneAndUpdate({question_id: req.params.question_id}, {'reported': 'true'})
  .then ( (results) => {
    res.send(results)
  })
  .catch ( (err) => {
    console.log(err)
  })
}
