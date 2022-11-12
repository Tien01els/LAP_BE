const express = require('express');
const { assignmentController } = require('../controllers/index');
const verifyToken = require('../middleware/auth');

const assignmentRouter = express.Router();

assignmentRouter.get('/teacher', verifyToken, assignmentController.getAssignmentsOfTeacher);
assignmentRouter.get('/:id', assignmentController.getAssignment);

assignmentRouter.post('/', verifyToken, assignmentController.postAssignment);
assignmentRouter.put('/:id', assignmentController.putAssignment);
assignmentRouter.delete('/:id', assignmentController.deleteAssignment);

module.exports = assignmentRouter;
