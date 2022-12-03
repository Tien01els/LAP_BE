const express = require('express');
const { studentAssignmentController } = require('../controllers/index');
const verifyToken = require('../middleware/auth');

const studentAssignmentRouter = express.Router();

studentAssignmentRouter.post('/', studentAssignmentController.postStudentAssignment);
studentAssignmentRouter.get(
    '/student/deadline',
    verifyToken,
    studentAssignmentController.getDeadlineOfStudent
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
studentAssignmentRouter.put(
    '/:id/submit-assignment',
    verifyToken,
    studentAssignmentController.submitAssignment
);

module.exports = studentAssignmentRouter;
