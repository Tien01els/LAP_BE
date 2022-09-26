const express = require('express');
const { gradeController } = require('../controllers/index');

const gradeRouter = express.Router();

gradeRouter.get(
    '/',
    gradeController.getAllGrades
);

module.exports = gradeRouter;
