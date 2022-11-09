const express = require('express');
const { topicController } = require('../controllers/index');
const verifyToken = require('../middleware/auth');

const topicRouter = express.Router();

topicRouter.post('/', topicController.postTopic);
//verify Token
topicRouter.get(
    '/teacher/grade/:gradeId',
    verifyToken,
    topicController.getTopicByTeacherIdAndGradeId
);
topicRouter.get('/teacher', verifyToken, topicController.getTopicByTeacherId);
topicRouter.get('/:id', topicController.getTopic);
topicRouter.get('/', topicController.getAllTopics);

topicRouter.put('/:id', verifyToken, topicController.putTopic);

module.exports = topicRouter;
