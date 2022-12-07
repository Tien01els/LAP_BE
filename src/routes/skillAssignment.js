const express = require('express');
const { skillAssignmentController } = require('../controllers/index');
const { verifyToken, authRole } = require('../middleware/auth');
const role = require('../config/roleConstant');

const skillAssignmentRouter = express.Router();

skillAssignmentRouter.post(
    '/',
    verifyToken,
    authRole(role.ROLE_TEACHER),
    skillAssignmentController.postSkillAssignment
);
skillAssignmentRouter.get(
    '/skill/:skillId',
    verifyToken,
    skillAssignmentController.getAllAssignmentInSkill
);
skillAssignmentRouter.get(
    '/student/skill/:skillId',
    verifyToken,
    authRole(role.ROLE_STUDENT),
    skillAssignmentController.getAllAssignmentInSkillOfStudent
);
skillAssignmentRouter.delete(
    '/:id',
    verifyToken,
    authRole(role.ROLE_TEACHER),
    skillAssignmentController.deleteAssignmentInSkill
);

module.exports = skillAssignmentRouter;
