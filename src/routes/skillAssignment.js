const express = require('express');
const { skillAssignmentController } = require('../controllers/index');
const verifyToken = require('../middleware/auth');

const skillAssignmentRouter = express.Router();

skillAssignmentRouter.post('/', verifyToken, skillAssignmentController.postSkillAssignment);
skillAssignmentRouter.get(
    '/skill/:skillId',
    verifyToken,
    skillAssignmentController.getAllAssignmentInSkill
);
skillAssignmentRouter.get(
    '/student/skill/:skillId',
    verifyToken,
    skillAssignmentController.getAllAssignmentInSkillOfStudent
);
skillAssignmentRouter.delete(
    '/:id',
    verifyToken,
    skillAssignmentController.deleteAssignmentInSkill
);

module.exports = skillAssignmentRouter;
