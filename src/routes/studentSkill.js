const express = require('express');
const { studentSkillController } = require('../controllers/index');
const verifyToken = require('../middleware/auth');

const studentSkillRouter = express.Router();

studentSkillRouter.get('/student/topic/:topicId', verifyToken, studentSkillController.getAllSkillInTopicOfStudent);

module.exports = studentSkillRouter;
