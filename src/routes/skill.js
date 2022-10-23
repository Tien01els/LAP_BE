const express = require('express');
const { skillController } = require('../controllers/index');

const skillRouter = express.Router();

skillRouter.get('/topic/:topicId', skillController.getSkillOfTopic);
skillRouter.get('/', skillController.getAllSkills);

module.exports = skillRouter;
