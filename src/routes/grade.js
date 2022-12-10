const express = require('express');
const { gradeController } = require('../controllers/index');
const { verifyToken, authRole } = require('../middleware/auth');
const role = require('../config/roleConstant');

const gradeRouter = express.Router();

//verify Token
gradeRouter.get(
    '/teacher',
    verifyToken,
    authRole(role.ROLE_TEACHER),
    gradeController.getGradeOfTeacher
);

gradeRouter.get('/:id/road-map', verifyToken, gradeController.getRoadMap);

gradeRouter.get('/', verifyToken, gradeController.getAllGrades);
gradeRouter.get('/class/:classId', verifyToken, gradeController.getGradeOfClass);

module.exports = gradeRouter;
