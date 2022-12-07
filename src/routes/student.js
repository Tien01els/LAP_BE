const express = require('express');
const { studentController } = require('../controllers/index');
const { verifyToken, authRole } = require('../middleware/auth');
const role = require('../config/roleConstant');

const studentRouter = express.Router();

studentRouter.get('/class/:classId', verifyToken, studentController.getStudentsOfClass);
studentRouter.get('/class', verifyToken, studentController.getClassOfStudent);
studentRouter.get('/achievement', verifyToken, studentController.getAchievementsOfStudent);
studentRouter.post(
    '/class/:classId',
    verifyToken,
    authRole(role.ROLE_TEACHER),
    studentController.addStudentToClass
);
studentRouter.delete(
    '/:studentId/class',
    verifyToken,
    authRole(role.ROLE_TEACHER),
    studentController.removeStudentFromClass
);

// studentRouter.post('/', studentController.postClassTopic);

module.exports = studentRouter;
