const express = require('express');
const { studentQuestionController } = require('../controllers/index');

const studentQuestionRouter = express.Router();

studentQuestionRouter.post(
    '/assignment/:assignmentId',
    studentQuestionController.postQuestionsOfAssignmentForStudent
);

module.exports = studentQuestionRouter;
