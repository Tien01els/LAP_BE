const express = require('express');
const { teacherQuestionController } = require('../controllers/index');
const verifyToken = require('../middleware/auth');

const teacherQuestionRouter = express.Router();

teacherQuestionRouter.get(
    '/teacher/assignment/:assignmentId',
    verifyToken,
    teacherQuestionController.getQuestionsOfAssignmentForTeacher
);

teacherQuestionRouter.put('/:id', verifyToken, teacherQuestionController.saveAnswerOfTeacher);

module.exports = teacherQuestionRouter;
