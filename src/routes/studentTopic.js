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

studentTopicRouter.put(
    '/class/:classId',
    verifyToken,
    authRole(role.ROLE_TEACHER),
    studentTopicController.updateTopicsOfStudent
);

studentTopicRouter.get(
    '/percent-skill',
    verifyToken,
    authRole(role.ROLE_STUDENT),
    studentTopicController.getPercentSkillsOfStudent
);

module.exports = studentTopicRouter;
