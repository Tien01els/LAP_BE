const express = require('express');
const { classController } = require('../controllers/index');
const { verifyToken, authRole } = require('../middleware/auth');
const role = require('../config/roleConstant');

const classRouter = express.Router();

//verify Token
classRouter.get(
    '/teacher/grade/:gradeId',
    verifyToken,
    authRole(role.ROLE_TEACHER),
    classController.getClassesByTeacherIdAndGradeId
);
classRouter.get(
    '/teacher',
    verifyToken,
    authRole(role.ROLE_TEACHER),
    classController.getClassesOfTeacher
);
classRouter.get('/:id', verifyToken, classController.getClassInfo);

classRouter.post('/', verifyToken, authRole(role.ROLE_TEACHER), classController.postClassInfo);
classRouter.put('/:id', verifyToken, authRole(role.ROLE_TEACHER), classController.putClassInfo);
classRouter.delete(
    '/:id',
    verifyToken,
    authRole(role.ROLE_TEACHER),
    classController.deleteClassInfo
);

module.exports = classRouter;
