const express = require('express');
const { assignmentQuestionController } = require('../controllers/index');

const assignmentQuestionRouter = express.Router();

assignmentQuestionRouter.post(
    '/',
    assignmentQuestionController.postListAssignmentQuestion
);

module.exports = assignmentQuestionRouter;
