const express = require('express');
const { studentController } = require('../controllers/index');
const verifyToken = require('../middleware/auth');

const studentRouter = express.Router();

studentRouter.get('/class/:classId', verifyToken, studentController.getStudentsOfClass);
studentRouter.get('/class', verifyToken, studentController.getClassOfStudent);
studentRouter.get('/achievement', verifyToken, studentController.getAchievementsOfStudent);
studentRouter.post('/class/:classId', verifyToken, studentController.addStudentToClass);
studentRouter.delete('/:studentId/class', verifyToken, studentController.removeStudentFromClass);

// studentRouter.post('/', studentController.postClassTopic);

module.exports = studentRouter;
