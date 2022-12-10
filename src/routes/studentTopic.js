const express = require('express');
const { studentTopicController } = require('../controllers/index');
const { verifyToken, authRole } = require('../middleware/auth');
const role = require('../config/roleConstant');

const studentTopicRouter = express.Router();

studentTopicRouter.post(
    '/',
    verifyToken,
    authRole(role.ROLE_TEACHER),
    studentTopicController.postStudentTopic
);

studentTopicRouter.get(
    '/student/class/:classId',
    verifyToken,
    authRole(role.ROLE_STUDENT),
    studentTopicController.getTopicsOfStudent
);

studentTopicRouter.get(
    '/percent-skill',
    verifyToken,
    studentTopicController.getPercentSkillsOfStudent
);

module.exports = studentTopicRouter;
