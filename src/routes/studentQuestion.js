const express = require('express');
const { studentQuestionController } = require('../controllers/index');
const verifyToken = require('../middleware/auth');

const studentQuestionRouter = express.Router();

studentQuestionRouter.post(
    '/assignment/:assignmentId',
    verifyToken,
    studentQuestionController.postQuestionsOfAssignmentForStudent
);

studentQuestionRouter.put(
    '/assignment/:assignmentId',
    verifyToken,
    studentQuestionController.getQuestionsOfAssignmentForStudent
);

module.exports = studentQuestionRouter;
