const express = require('express');
const { questionController } = require('../controllers/index');

const questionRouter = express.Router();

questionRouter.get('/question-bank', questionController.getQuestionBank);
questionRouter.get('/:id', questionController.getQuestion);
questionRouter.post('/', questionController.postQuestion);
questionRouter.put('/:id', questionController.putQuestion);
questionRouter.delete('/:id', questionController.deleteQuestion);

module.exports = questionRouter;
