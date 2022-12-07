const express = require('express');
const { assignmentQuestionController } = require('../controllers/index');
const { verifyToken, authRole } = require('../middleware/auth');
const role = require('../config/roleConstant');

const assignmentQuestionRouter = express.Router();

assignmentQuestionRouter.post(
    '/',
    verifyToken,
    authRole(role.ROLE_TEACHER),
    assignmentQuestionController.postListAssignmentQuestion
);
assignmentQuestionRouter.post(
    '/generate',
    verifyToken,
    authRole(role.ROLE_TEACHER),
    assignmentQuestionController.generateAssignmentQuestion
);

assignmentQuestionRouter.put(
    '/assignment/:assignmentId',
    verifyToken,
    authRole(role.ROLE_TEACHER),
    assignmentQuestionController.putQuestionOfAssignment
);

assignmentQuestionRouter.get(
    '/assignment/:assignmentId',
    verifyToken,
    assignmentQuestionController.getQuestionOfAssignment
);

module.exports = assignmentQuestionRouter;
