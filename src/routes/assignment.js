const express = require('express');
const { assignmentController } = require('../controllers/index');

const assignmentRouter = express.Router();
// :teacherId assignmentController.getDeadlines
assignmentRouter.get(
    '/:teacherId',
    assignmentController.getAssignmentsOfTeacher
);
assignmentRouter.post('/', assignmentController.postAssignment);

module.exports = assignmentRouter;
