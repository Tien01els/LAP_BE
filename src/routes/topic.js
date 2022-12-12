const express = require('express');
const { topicController } = require('../controllers/index');
const { verifyToken, authRole } = require('../middleware/auth');
const role = require('../config/roleConstant');

const topicRouter = express.Router();

topicRouter.post('/', verifyToken, authRole(role.ROLE_TEACHER), topicController.postTopic);
//verify Token
topicRouter.get(
    '/teacher/grade/:gradeId',
    verifyToken,
    authRole(role.ROLE_TEACHER),
    topicController.getTopicByTeacherIdAndGradeId
);
topicRouter.get(
    '/teacher',
    verifyToken,
    authRole(role.ROLE_TEACHER),
    topicController.getTopicByTeacherId
);
topicRouter.get('/:id', verifyToken, topicController.getTopic);
topicRouter.get('/', verifyToken, topicController.getAllTopics);

topicRouter.put('/:id', verifyToken, authRole(role.ROLE_TEACHER), topicController.putTopic);

topicRouter.delete('/:id', verifyToken, authRole(role.ROLE_TEACHER), topicController.deleteTopic);

module.exports = topicRouter;
