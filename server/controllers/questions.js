const express = require('express');
const Question = require('../models/Question');

// GET QUESTIONS
exports.retrieveQuestionsByProductId = (req, res) => {

  Question.find({product_id: req.query.product_id, reported: {$in: [null, false]}})
  .select('-_id -product_id -asker_email -answers._id -answers.question_id -answers.answerer_email -answers.reported')
  .then ( (results) => {
    let resultsObj = {
      product_id: req.query.product_id,
      results: results
    }
    console.log(resultsObj, 'line 10 controllers')
    res.send(resultsObj);
  })
  .catch( (err) => {
    console.log(err)
  });

}

// GET ANSWERS
exports.retrieveAnswersByQuestionID = (req, res) => {
  // console.log(req.params.question_id)

  // Question.find( {question_id: req.params.question_id}, {answers: true} )
  // .select('-answers._id -answers.question_id -answers.answerer_email -answers.reported')
  /** displays all answers but doesn't remove the above field names, no errors */

  Question.find( {question_id: req.params.question_id})

  // .select('answers -answers._id -answers.question_id -answers.answerer_email -answers.reported')
  .select('-answers._id -answers.question_id -answers.answerer_email -answers.reported')
  // .select({answers: 1, answerer_email: 0})
  /** no need to use command to display answers since the GET request already does that
   * if you use both 1, 0 (select, deselect), the .select command doesn't work
   */
  // .updateMany({}, {$rename: {"answers.id": "answers.answer_id"}}) //results in error



  .then ( (results) => {
    // console.log(results[0].answers)
    res.send(results);
  })
  .catch( (err) => {
    console.log(err)
  });

}

// ADD QUESTION
exports.addQuestion = (req, res) => {

  Question.create({
    product_id: req.query.product_id,
    asker_name: req.body.data.asker_name,
    asker_email: req.body.data.asker_email,
    reported: false, //default value
    question_body: req.body.data.question_body,
    question_helpfulness: 0, //default value
    answers: [] //default value
  })
  .then ( (results) => {
    //console.log(results)
    res.send('successfully posted question')
  })
  .catch ( (err) => {
    console.log(err)
  });
}

// ADD ANSWER
exports.addAnswer = (req, res) => {
  console.log(req.params.question_id, 'line 56')
  console.log(req.body.data, 'line 57')

  Question.updateOne(
    {question_id: req.params.question_id},
    {$push: {answers: {
      'question_id': req.params.question_id,
      'body': req.body.data.body,
      'answerer_name': req.body.data.answerer_name,
      'answerer_email': req.body.data.answerer_email,
      'reported': false,
      'helpfulness': 0,
      'date': new Date(),
      'photos': []
    }}}
  )
  .then ( (results) => {
    console.log(results, 'line 71');
    res.send(results)
  })
  .catch ( (err) => {
    console.log(err)
  })
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
