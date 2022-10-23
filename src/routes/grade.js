const express = require('express');
const { gradeController } = require('../controllers/index');

const gradeRouter = express.Router();

gradeRouter.get(
    '/',
    gradeController.getAllGrades
);
gradeRouter.get(
    '/teacher/:teacherId',
    gradeController.getGradeOfTeacher
);
module.exports = gradeRouter;
