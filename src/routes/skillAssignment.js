const express = require('express');
const { skillAssignmentController } = require('../controllers/index');

const skillAssignmentRouter = express.Router();

skillAssignmentRouter.post('/', skillAssignmentController.postSkillAssignment);
skillAssignmentRouter.get('/skill/:skillId', skillAssignmentController.getAssignmentOfSkill);

module.exports = skillAssignmentRouter;
