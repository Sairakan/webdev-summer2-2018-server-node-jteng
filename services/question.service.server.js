module.exports = app => {
  const questionModel = require('../models/quizzes/question.model.server')

  createQuestion = (req, res) => {
    questionModel
      .createQuestion(req.body)
      .then(
        question => res.json(question),
        error => res.send(error)
      );
  }

  getAllQuestions = (req, res) => {
    questionModel.findAllQuestions()
      .then(questions => {
        res.send(questions);
      });
  }

  app.post('/api/question', createQuestion);
  app.get('/api/question', getAllQuestions);
}