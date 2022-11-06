const express = require('express');
const { assignmentQuestionController } = require('../controllers/index');

const assignmentQuestionRouter = express.Router();

assignmentQuestionRouter.post('/', assignmentQuestionController.postListAssignmentQuestion);
assignmentQuestionRouter.post('/generate', assignmentQuestionController.generateAssignmentQuestion);

assignmentQuestionRouter.put('/', assignmentQuestionController.putQuestionOfAssignment);

assignmentQuestionRouter.get(
    '/assignment/:assignmentId',
    assignmentQuestionController.getQuestionOfAssignment
);

module.exports = assignmentQuestionRouter;
