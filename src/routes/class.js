const express = require('express');
const { classController } = require('../controllers/index');
const verifyToken = require('../middleware/auth');

const classRouter = express.Router();

//verify Token
classRouter.get(
    '/teacher/grade/:gradeId',
    verifyToken,
    classController.getClassesByTeacherIdAndGradeId
);
classRouter.get('/teacher', verifyToken, classController.getClassesOfTeacher);
classRouter.get('/:id', verifyToken, classController.getClassInfo);

classRouter.post('/', verifyToken, classController.postClassInfo);
classRouter.put('/:id', verifyToken, classController.putClassInfo);
classRouter.delete('/:id', verifyToken, classController.deleteClassInfo);

module.exports = classRouter;
