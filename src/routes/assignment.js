const express = require('express');
const { assignmentController } = require('../controllers/index');

const assignmentRouter = express.Router();

assignmentRouter.get(
    '/teacher/:teacherId',
    assignmentController.getAssignmentsOfTeacher
);
assignmentRouter.get('/:id', assignmentController.getAssignment);
assignmentRouter.post('/', assignmentController.postAssignment);
assignmentRouter.put('/:id', assignmentController.putAssignment);
assignmentRouter.delete('/:id', assignmentController.deleteAssignment);

module.exports = assignmentRouter;
