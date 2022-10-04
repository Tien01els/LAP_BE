const express = require('express');
const { questionController } = require('../controllers/index');

const questionRouter = express.Router();

questionRouter.post('/', questionController.postQuestion);
questionRouter.get('/:assignmentId', questionController.getQuestionOfAssignment);
questionRouter.get('/:id', questionController.deleteQuestion);

module.exports = questionRouter;
