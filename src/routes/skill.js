const express = require('express');
const { skillController } = require('../controllers/index');
const { verifyToken, authRole } = require('../middleware/auth');
const role = require('../config/roleConstant');

const skillRouter = express.Router();

skillRouter.get('/topic/:topicId', verifyToken, skillController.getSkillOfTopic);
skillRouter.get('/:id', verifyToken, skillController.getSkill);
skillRouter.get('/', verifyToken, skillController.getAllSkills);
skillRouter.post('/', verifyToken, authRole(role.ROLE_TEACHER), skillController.postSkill);
skillRouter.delete('/:id', verifyToken, authRole(role.ROLE_TEACHER), skillController.deleteSkill);

module.exports = skillRouter;
