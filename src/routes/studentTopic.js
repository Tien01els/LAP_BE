const express = require('express');
const { studentTopicController } = require('../controllers/index');
const verifyToken = require('../middleware/auth');

const studentTopicRouter = express.Router();

studentTopicRouter.post('/', verifyToken, studentTopicController.postStudentTopic);
studentTopicRouter.put(
    '/class/:classId',
    verifyToken,
    studentTopicController.updateTopicsOfStudent
);
studentTopicRouter.get(
    '/percent-skill',
    verifyToken,
    studentTopicController.getPercentSkillsOfStudent
);

module.exports = studentTopicRouter;
