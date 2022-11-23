const express = require('express');
const { assignmentQuestionController } = require('../controllers/index');
const verifyToken = require('../middleware/auth');

const assignmentQuestionRouter = express.Router();

assignmentQuestionRouter.post('/', assignmentQuestionController.postListAssignmentQuestion);
assignmentQuestionRouter.post('/generate', assignmentQuestionController.generateAssignmentQuestion);

assignmentQuestionRouter.put(
    '/',
    verifyToken,
    assignmentQuestionController.putQuestionOfAssignment
);

assignmentQuestionRouter.get(
    '/assignment/:assignmentId',
    assignmentQuestionController.getQuestionOfAssignment
);

module.exports = assignmentQuestionRouter;
