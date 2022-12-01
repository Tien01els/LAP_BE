const express = require('express');
const { skillController } = require('../controllers/index');
const verifyToken = require('../middleware/auth');

const skillRouter = express.Router();

skillRouter.get('/topic/:topicId', verifyToken, skillController.getSkillOfTopic);
skillRouter.get('/:id', verifyToken, skillController.getSkill);
skillRouter.get('/', verifyToken, skillController.getAllSkills);
skillRouter.post('/', verifyToken, skillController.postSkill);
skillRouter.delete('/:id', verifyToken, skillController.deleteSkill);

module.exports = skillRouter;
