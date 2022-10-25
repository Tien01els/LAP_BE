const express = require('express');
const { skillController } = require('../controllers/index');

const skillRouter = express.Router();

skillRouter.get('/topic/:topicId', skillController.getSkillOfTopic);
skillRouter.get('/:id', skillController.getSkill);
skillRouter.get('/', skillController.getAllSkills);
skillRouter.post('/', skillController.postSkill);
skillRouter.delete('/:id', skillController.deleteSkill);

module.exports = skillRouter;
