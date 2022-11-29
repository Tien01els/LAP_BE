const express = require('express');
const { classAssignmentController } = require('../controllers/index');
const verifyToken = require('../middleware/auth');

const classAssignmentRouter = express.Router();

classAssignmentRouter.get('/class/:classId', verifyToken, classAssignmentController.getAssignmentOfClass);
classAssignmentRouter.post('/', verifyToken, classAssignmentController.postClassAssignment);
classAssignmentRouter.put('/class/:classId/assignment/:assignmentId', verifyToken, classAssignmentController.updateDueDateOfClassAssignment);
classAssignmentRouter.delete('/:id', verifyToken, classAssignmentController.deleteClassAssignment);

module.exports = classAssignmentRouter;
