const mongoose = require('mongoose')
const schema = require('./submission.schema.server')
const submissionModel = mongoose.model('SubmissionModel', schema)

createSubmission = submission =>
  submissionModel.create(submission)

findAllSubmissions = () =>
  submissionModel.find()

findSubmissionById = id =>
  submissionModel.findOne({ _id: id })
    .populate({
      path: 'quiz',
      populate: {
        path: 'questions'
      }
    })
    .populate('answers.question')
    .populate('student')
    .exec()

findAllSubmissionsForStudent = studentId =>
  submissionModel.find({ student: studentId })

findAllSubmissionsForQuiz = quizId =>
  submissionModel.find({ quiz: quizId })
    .populate('student')

module.exports = {
  createSubmission,
  findAllSubmissions,
  findSubmissionById,
  findAllSubmissionsForStudent,
  findAllSubmissionsForQuiz
}