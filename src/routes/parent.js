const express = require('express');
const { parentController } = require('../controllers/index');
const { verifyToken, authRole } = require('../middleware/auth');
const role = require('../config/roleConstant');

const parentRouter = express.Router();

parentRouter.get(
    '/student/:studentId/topic/:topicId',
    verifyToken,
    authRole(role.ROLE_PARENT),
    parentController.getAllSkillInTopicOfStudent
);
parentRouter.get(
    '/student/:studentId/class/:classId/topic',
    verifyToken,
    authRole(role.ROLE_PARENT),
    parentController.getTopicsOfStudnet
);
parentRouter.get(
    '/student/:studentId/class/:classId',
    verifyToken,
    authRole(role.ROLE_PARENT),
    parentController.getExamsOfStudent
);
parentRouter.get(
    '/student/:studentId/class',
    verifyToken,
    authRole(role.ROLE_PARENT),
    parentController.getClassOfStudent
);

parentRouter.get(
    '/student/:studentId/skill/:skillId',
    verifyToken,
    authRole(role.ROLE_PARENT),
    parentController.getAllAssignmentInSkillOfStudent
);
parentRouter.get(
    '/student/:studentId/assignment/:assignmentId/result',
    verifyToken,
    authRole(role.ROLE_PARENT),
    parentController.getResultOfAssignmentOfStudent
);

parentRouter.get(
    '/student/:studentId/achievement',
    verifyToken,
    authRole(role.ROLE_PARENT),
    parentController.getAchievementsOfStudent
);
parentRouter.get(
    '/student/:studentId/deadline',
    verifyToken,
    authRole(role.ROLE_PARENT),
    parentController.getDeadlineOfStudent
);
parentRouter.get(
    '/student/:studentId/percent-skill',
    verifyToken,
    authRole(role.ROLE_PARENT),
    parentController.getPercentSkillsOfStudent
);
parentRouter.get(
    '/student',
    verifyToken,
    authRole(role.ROLE_PARENT),
    parentController.getStudentOfParent
);

module.exports = parentRouter;
