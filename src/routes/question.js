const express = require('express');
const { questionController } = require('../controllers/index');

const questionRouter = express.Router();

questionRouter.post('/', questionController.postQuestion);
questionRouter.get('/:assignmentId', questionController.getQuestionOfAssignment);

module.exports = questionRouter;
