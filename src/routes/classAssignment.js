const express = require('express');
const { classAssignmentController } = require('../controllers/index');

const classAssignmentRouter = express.Router();

classAssignmentRouter.post('/', classAssignmentController.postClassAssignment);
classAssignmentRouter.delete('/', classAssignmentController.deleteClassAssignment);

module.exports = classAssignmentRouter;
