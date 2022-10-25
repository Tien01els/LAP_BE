const express = require('express')
const { classController } = require('../controllers/index')

const classRouter = express.Router()

classRouter.get(
    '/teacher/:teacherId/grade/:gradeId',
    classController.getClassesByTeacherIdAndGradeId
);
classRouter.get('/teacher/:teacherId', classController.getClasses);
classRouter.get('/:id', classController.getClassInfo);

module.exports = classRouter;