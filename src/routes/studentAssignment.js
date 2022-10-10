const express = require('express');
const { studentAssignmentController } = require('../controllers/index');

const studentAssignmentRouter = express.Router();

studentAssignmentRouter.post(
    '/',
    studentAssignmentController.postStudentAssignment
);

module.exports = studentAssignmentRouter;
