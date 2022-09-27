const express = require('express');
const { classController } = require('../controllers/index');

const classRouter = express.Router();

classRouter.get(
    '/:teacherId/:gradeId',
    classController.getClassesByTeacherIdAndGradeId
);

module.exports = classRouter;
