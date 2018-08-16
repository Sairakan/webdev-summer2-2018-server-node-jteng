const mongoose = require('mongoose')
module.exports = mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserModel'
  },
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'QuizModel'
  },
  answers: [{
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'QuestionModel'
    },
    essayAnswer: String,
    fillBlanksAnswers: [String],
    trueFalseAnswer: Boolean,
    multipleChoiceAnswer: Number
  }]
}, { collection: 'submission', timestamps: { createdAt: 'createdAt' } })