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

gradeRouter.post('/', verifyToken, authRole(role.ROLE_ADMIN), gradeController.postGrade);
gradeRouter.delete('/:id', verifyToken, authRole(role.ROLE_ADMIN), gradeController.deleteGrade);

module.exports = gradeRouter;
