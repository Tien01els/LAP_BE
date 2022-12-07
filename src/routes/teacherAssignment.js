const express = require('express');
const { teacherAssignmentController } = require('../controllers/index');
const { verifyToken, authRole } = require('../middleware/auth');
const role = require('../config/roleConstant');

const teacherAssignmentRouter = express.Router();

teacherAssignmentRouter.get(
    '/teacher/assignment/:assignmentId',
    verifyToken,
    authRole(role.ROLE_TEACHER),
    teacherAssignmentController.getAssignmentOfTeacher
);

teacherAssignmentRouter.get(
    '/teacher/assignment/:assignmentId/do-time',
    verifyToken,
    authRole(role.ROLE_TEACHER),
    teacherAssignmentController.getDoTimeAssignmentOfTeacher
);

teacherAssignmentRouter.put(
    '/teacher/assignment/:assignmentId/trial',
    verifyToken,
    authRole(role.ROLE_TEACHER),
    teacherAssignmentController.trialTeacherAssignment
);

teacherAssignmentRouter.put(
    '/teacher/assignment/:assignmentId/submit',
    verifyToken,
    authRole(role.ROLE_TEACHER),
    teacherAssignmentController.submitAssignment
);

module.exports = teacherAssignmentRouter;
