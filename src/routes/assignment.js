const express = require('express');
const { assignmentController } = require('../controllers/index');

const assignmentRouter = express.Router();
// :teacherId assignmentController.getDeadlines
assignmentRouter.get('/:teacherId', assignmentController.getDeadlines);

module.exports = assignmentRouter;
