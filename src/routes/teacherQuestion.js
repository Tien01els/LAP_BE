const express = require('express');
const { teacherQuestionController } = require('../controllers/index');
const { verifyToken, authRole } = require('../middleware/auth');
const role = require('../config/roleConstant');

const teacherQuestionRouter = express.Router();

teacherQuestionRouter.get(
    '/teacher/assignment/:assignmentId',
    verifyToken,
    authRole(role.ROLE_TEACHER),
    teacherQuestionController.getQuestionsOfAssignmentForTeacher
);

teacherQuestionRouter.put(
    '/:id',
    verifyToken,
    authRole(role.ROLE_TEACHER),
    teacherQuestionController.saveAnswerOfTeacher
);

module.exports = teacherQuestionRouter;
