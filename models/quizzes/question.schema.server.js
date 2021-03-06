const mongoose = require('mongoose');
module.exports = mongoose.Schema({
  title: String,
  points: Number,
  description: String,
  questionType: {
    type: String,
    enum: [
      'ESSAY',
      'FILL_BLANKS',
      'TRUE_FALSE',
      'MULTIPLE_CHOICE'
    ]
  },
  blanks: [String],
  true: Boolean,
  choices: [{
    text: String,
    value: String,
    correct: Boolean
  }]
}, {collection: 'question'});