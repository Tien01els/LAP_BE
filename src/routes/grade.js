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

gradeRouter.get('/', verifyToken, gradeController.getAllGrades);

module.exports = gradeRouter;
