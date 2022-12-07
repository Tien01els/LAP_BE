const express = require('express');
const { studentSkillController } = require('../controllers/index');
const { verifyToken, authRole } = require('../middleware/auth');
const role = require('../config/roleConstant');

const studentSkillRouter = express.Router();

studentSkillRouter.get(
    '/student/topic/:topicId',
    verifyToken,
    authRole(role.ROLE_STUDENT),
    studentSkillController.getAllSkillInTopicOfStudent
);

module.exports = studentSkillRouter;
