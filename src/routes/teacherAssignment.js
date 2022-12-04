const express = require('express');
const { teacherAssignmentController } = require('../controllers/index');
const verifyToken = require('../middleware/auth');

const teacherAssignmentRouter = express.Router();

teacherAssignmentRouter.get(
    '/teacher/assignment/:assignmentId',
    verifyToken,
    teacherAssignmentController.getAssignmentOfTeacher
);

teacherAssignmentRouter.get(
    '/teacher/assignment/:assignmentId/do-time',
    verifyToken,
    teacherAssignmentController.getDoTimeAssignmentOfTeacher
);

teacherAssignmentRouter.put(
    '/teacher/assignment/:assignmentId/trial',
    verifyToken,
    teacherAssignmentController.trialTeacherAssignment
);

teacherAssignmentRouter.put(
    '/teacher/assignment/:assignmentId/submit',
    verifyToken,
    teacherAssignmentController.submitAssignment
);

module.exports = teacherAssignmentRouter;
