const express = require('express');
const { studentQuestionController } = require('../controllers/index');
const { verifyToken, authRole } = require('../middleware/auth');
const role = require('../config/roleConstant');

const studentQuestionRouter = express.Router();

studentQuestionRouter.get(
    '/student/assignment/:assignmentId',
    verifyToken,
    authRole(role.ROLE_STUDENT),
    studentQuestionController.getQuestionsOfAssignmentForStudent
);

studentQuestionRouter.put(
    '/:id',
    verifyToken,
    authRole(role.ROLE_STUDENT),
    studentQuestionController.saveAnswerOfStudent
);

module.exports = studentQuestionRouter;
