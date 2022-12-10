const express = require('express');
const { studentAssignmentController } = require('../controllers/index');
const { verifyToken, authRole } = require('../middleware/auth');
const role = require('../config/roleConstant');

const studentAssignmentRouter = express.Router();

studentAssignmentRouter.post(
    '/',
    verifyToken,
    authRole(role.ROLE_TEACHER),
    studentAssignmentController.postStudentAssignment
);
studentAssignmentRouter.get(
    '/student/class/:classId',
    verifyToken,
    authRole(role.ROLE_STUDENT),
    studentAssignmentController.getExamsOfStudent
);
studentAssignmentRouter.get(
    '/student/deadline',
    verifyToken,
    studentAssignmentController.getDeadlineOfStudent
);
studentAssignmentRouter.get(
    '/student/assignment/:assignmentId',
    verifyToken,
    authRole(role.ROLE_STUDENT),
    studentAssignmentController.getAssignmentOfStudent
);
studentAssignmentRouter.get(
    '/student/assignment/:assignmentId/do-time',
    verifyToken,
    authRole(role.ROLE_STUDENT),
    studentAssignmentController.getDoTimeAssignmentOfStudent
);

studentAssignmentRouter.put(
    '/student/assignment/:assignmentId/start',
    verifyToken,
    studentAssignmentController.startAssignment
);
studentAssignmentRouter.put(
    '/student/assignment/:assignmentId/submit',
    verifyToken,
    authRole(role.ROLE_STUDENT),
    studentAssignmentController.submitAssignment
);
studentAssignmentRouter.put(
    '/assignment/:assignmentId/assign-list-student',
    verifyToken,
    authRole(role.ROLE_TEACHER),
    studentAssignmentController.assignForListStudent
);
studentAssignmentRouter.put(
    '/assignment/:assignmentId/class/:classId/date-due',
    verifyToken,
    authRole(role.ROLE_TEACHER),
    studentAssignmentController.updateDateDueOfStudentAssignment
);

module.exports = studentAssignmentRouter;
