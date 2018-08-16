module.exports = app => {

  const quizModel = require('../models/quizzes/quiz.model.server');
  const submissionModel = require('../models/quizzes/submission.model.server');

  createQuiz = (req, res) => {
    quizModel.createQuiz(req.body)
      .then(quiz => res.send(quiz));
  }

  findAllQuizzes = (req, res) => {
    quizModel.findAllQuizzes()
      .then(quizzes => res.send(quizzes));
  }

  findQuizById = (req, res) => {
    quizModel.findQuizById(req.params.quizId)
      .then(quiz => res.send(quiz));
  }

  updateQuiz = (req, res) => {
    quizModel.updateQuiz(req.params.quizId, req.body)
      .then(status => res.send(status));
  }

  deleteQuiz = (req, res) => {
    quizModel.deleteQuiz(req.params.quizId)
      .then(status => res.send(status));
  }

  addQuestion = (req, res) => {
    quizModel
      .addQuestion(req.params.quizId, req.params.questionId)
      .then(
        status => res.send(status),
        error => res.send(error)
      );
  }

  submitQuiz = (req, res) => {
    let student = req.session['currentUser'];
    let answers = [];
    for (let question of req.body.questions) {
      answer = {
        question: question._id
      }
      switch (question.questionType) {
        case 'ESSAY':
          answer.essayAnswer = question.essayAnswer;
          break;
        case 'FILL_BLANKS':
          answer.fillBlanksAnswers = question.fillBlanksAnswers;
          break;
        case 'TRUE_FALSE':
          answer.trueFalseAnswer = question.trueFalseAnswer;
          break;
        case 'MULTIPLE_CHOICE':
          answer.multipleChoiceAnswer = question.multipleChoiceAnswer;
          break;
        default:
          res.sendStatus(500);
          return;
      }
      answers.push(answer);
    }
    quizModel.findQuizById(req.params.quizId)
      .then(quiz => {
        submission = {
          student,
          quiz,
          answers
        }
        submissionModel.createSubmission(submission)
          .then(response => res.send(response));
      })
  }

  findSubmissionsForQuiz = (req, res) => {
    submissionModel.findAllSubmissionsForQuiz(req.params.quizId)
      .then(submissions => res.send(submissions));
  }

  findSubmissionById = (req, res) => {
    submissionModel.findSubmissionById(req.params.submissionId)
      .then(submission => res.send(submission));
  }

  app.post('/api/quiz', createQuiz);
  app.get('/api/quiz', findAllQuizzes);
  app.get('/api/quiz/:quizId', findQuizById);
  app.put('/api/quiz/:quizId', updateQuiz);
  app.delete('/api/quiz/:quizId', deleteQuiz);
  app.put('/api/quiz/:quizId/question/:questionId', addQuestion);
  app.post('/api/quiz/:quizId/submission', submitQuiz);
  app.get('/api/quiz/:quizId/submissions', findSubmissionsForQuiz);
  app.get('/api/quiz/:quizId/submission/:submissionId', findSubmissionById);
}