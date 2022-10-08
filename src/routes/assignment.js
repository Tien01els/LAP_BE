const express = require('express');
const { assignmentController } = require('../controllers/index');

const assignmentRouter = express.Router();

assignmentRouter.get(
    '/:teacherId',
    assignmentController.getAssignmentsOfTeacher
);
assignmentRouter.get('/questions/:id', assignmentController.getAssignmentWithQuestion);
assignmentRouter.post('/', assignmentController.postAssignment);
assignmentRouter.put('/:id', assignmentController.putAssignment);
assignmentRouter.delete('/:id', assignmentController.deleteAssignment);

module.exports = assignmentRouter;
