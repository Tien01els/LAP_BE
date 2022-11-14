const express = require('express');
const { gradeController } = require('../controllers/index');
const verifyToken = require('../middleware/auth');

const gradeRouter = express.Router();

//verify Token
gradeRouter.get('/teacher', verifyToken, gradeController.getGradeOfTeacher);

gradeRouter.get('/', gradeController.getAllGrades);


module.exports = gradeRouter;
