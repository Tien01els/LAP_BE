const express = require('express');
const { parentController } = require('../controllers/index');
const verifyToken = require('../middleware/auth');

const parentRouter = express.Router();

parentRouter.get('/student/:studentId/topic/:topicId', verifyToken, parentController.getAllSkillInTopicOfStudent);
parentRouter.get('/student/:studentId/class/:classId/topic', verifyToken, parentController.getTopicsOfStudnet);
parentRouter.get('/student/:studentId/class/:classId', verifyToken, parentController.getExamsOfStudent);
parentRouter.get('/student/:studentId/class', verifyToken, parentController.getClassOfStudent);

parentRouter.get('/student/:studentId/skill/:skillId', verifyToken, parentController.getAllAssignmentInSkillOfStudent);
parentRouter.get('/student/:studentId/assignment/:assignmentId/result', verifyToken, parentController.getResultOfAssignmentOfStudent);

parentRouter.get('/student/:studentId/achievement', verifyToken, parentController.getAchievementsOfStudent);
parentRouter.get('/student/:studentId/deadline', verifyToken, parentController.getDeadlineOfStudent);
parentRouter.get('/student/:studentId/percent-skill', verifyToken, parentController.getPercentSkillsOfStudent);
parentRouter.get('/student', verifyToken, parentController.getStudentOfParent);

module.exports = parentRouter;
