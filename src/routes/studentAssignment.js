const express = require('express');
const { studentAssignmentController } = require('../controllers/index');
const verifyToken = require('../middleware/auth');

const studentAssignmentRouter = express.Router();

studentAssignmentRouter.post('/', verifyToken, studentAssignmentController.postStudentAssignment);
studentAssignmentRouter.get(
    '/student/class/:classId',
    verifyToken,
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
    studentAssignmentController.getAssignmentOfStudent
);
studentAssignmentRouter.get(
    '/student/assignment/:assignmentId/do-time',
    verifyToken,
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
    studentAssignmentController.submitAssignment
);
studentAssignmentRouter.put(
    '/assignment/:assignmentId/assign-list-student',
    verifyToken,
    studentAssignmentController.assignForListStudent
);
studentAssignmentRouter.put(
    '/assignment/:assignmentId/class/:classId/date-due',
    verifyToken,
    studentAssignmentController.updateDateDueOfStudentAssignment
);

module.exports = studentAssignmentRouter;
