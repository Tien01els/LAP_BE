const express = require('express');
const { classAssignmentController } = require('../controllers/index');

const classAssignmentRouter = express.Router();

classAssignmentRouter.post('/', classAssignmentController.postClassAssignment);

module.exports = classAssignmentRouter;
