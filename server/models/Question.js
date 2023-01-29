const mongoose = require('mongoose');
const db = require('../index.js'); //not sure what this is for

const questionSchema = new mongoose.Schema({


      product_id: Number,
      question_id: Number,
      question_body: String,
      question_date: Date,
      asker_name: String,
      asker_email: String,
      question_helpfulness: Number,
      reported: Boolean,
      answers: [{
        id: Number,
        question_id: Number,
        body: String,
        date_written: Date,
        answerer_name: String,
        answerer_email: String,
        reported: Boolean,
        helpful: Number,
        photos: [{
          id: Number,
          answer_id: Number,
          url: String
        }]

  }]

})


module.exports = mongoose.model('Question', questionSchema);