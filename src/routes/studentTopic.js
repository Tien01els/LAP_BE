const express = require('express');
const { studentTopicController } = require('../controllers/index');
const verifyToken = require('../middleware/auth');

const studentTopicRouter = express.Router();

studentTopicRouter.post('/', studentTopicController.postStudentTopic);
studentTopicRouter.put(
    '/student/class/:classId',
    verifyToken,
    studentTopicController.updateTopicsOfStudent
);

module.exports = studentTopicRouter;
