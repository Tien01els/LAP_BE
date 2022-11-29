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
    studentAssignmentController.assignForListStudent
);
studentAssignmentRouter.put(
    '/assignment/:assignmentId/class/:classId/date-due',
    studentAssignmentController.updateDateDueOfStudentAssignment
);

module.exports = studentAssignmentRouter;
