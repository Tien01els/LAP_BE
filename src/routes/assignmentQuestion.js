const express = require('express');
const { assignmentQuestionController } = require('../controllers/index');
const verifyToken = require('../middleware/auth');

const assignmentQuestionRouter = express.Router();

assignmentQuestionRouter.post('/',verifyToken, assignmentQuestionController.postListAssignmentQuestion);
assignmentQuestionRouter.post('/generate', verifyToken, assignmentQuestionController.generateAssignmentQuestion);

assignmentQuestionRouter.put(
    '/assignment/:assignmentId',
    verifyToken,
    assignmentQuestionController.putQuestionOfAssignment
);

assignmentQuestionRouter.get(
    '/assignment/:assignmentId', verifyToken,
    assignmentQuestionController.getQuestionOfAssignment
);

module.exports = assignmentQuestionRouter;
