const express = require('express');
const { assignmentController } = require('../controllers/index');
const verifyToken = require('../middleware/auth');

const assignmentRouter = express.Router();

assignmentRouter.get('/teacher', verifyToken, assignmentController.getAssignmentsOfTeacher);
assignmentRouter.get('/:id/summary', verifyToken, assignmentController.getAssignmentSummary);
assignmentRouter.get('/:id', verifyToken, assignmentController.getAssignment);

assignmentRouter.post('/', verifyToken, assignmentController.postAssignment);
assignmentRouter.put('/:id', verifyToken, assignmentController.putAssignment);
assignmentRouter.delete('/:id', verifyToken, assignmentController.deleteAssignment);

module.exports = assignmentRouter;
