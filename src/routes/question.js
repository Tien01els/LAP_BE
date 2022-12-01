const express = require('express');
const { questionController } = require('../controllers/index');
const verifyToken = require('../middleware/auth');

const questionRouter = express.Router();

questionRouter.get('/question-bank', verifyToken, questionController.getQuestionBank);
questionRouter.get('/:id', verifyToken, questionController.getQuestion);
questionRouter.post('/', verifyToken, questionController.postQuestion);
questionRouter.put('/:id', verifyToken, questionController.putQuestion);
questionRouter.delete('/:id', verifyToken, questionController.deleteQuestion);

module.exports = questionRouter;
