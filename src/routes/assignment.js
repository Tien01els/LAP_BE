const express = require('express');
const { assignmentController } = require('../controllers/index');

const assignmentRouter = express.Router();
// :teacherId assignmentController.getDeadlines
assignmentRouter.get(
    '/:teacherId',
    assignmentController.getAssignmentsOfTeacher
);
assignmentRouter.post(
    '/:teacherId',
    assignmentController.postAssignmentOfTeacher
);

module.exports = assignmentRouter;
