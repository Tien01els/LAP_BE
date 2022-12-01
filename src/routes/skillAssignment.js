const express = require('express');
const { skillAssignmentController } = require('../controllers/index');
const verifyToken = require('../middleware/auth');

const skillAssignmentRouter = express.Router();

skillAssignmentRouter.post('/', verifyToken, skillAssignmentController.postSkillAssignment);
skillAssignmentRouter.get(
    '/skill/:skillId',
    verifyToken,
    skillAssignmentController.getAssignmentOfSkill
);
skillAssignmentRouter.delete(
    '/:id',
    verifyToken,
    skillAssignmentController.deleteAssignmentOfSkill
);

module.exports = skillAssignmentRouter;
