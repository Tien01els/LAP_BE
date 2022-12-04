const express = require('express');
const { studentQuestionController } = require('../controllers/index');
const verifyToken = require('../middleware/auth');

const studentQuestionRouter = express.Router();

studentQuestionRouter.get(
    '/student/assignment/:assignmentId',
    verifyToken,
    studentQuestionController.getQuestionsOfAssignmentForStudent
);

studentQuestionRouter.put('/:id', verifyToken, studentQuestionController.saveAnswerOfStudent);

module.exports = studentQuestionRouter;
