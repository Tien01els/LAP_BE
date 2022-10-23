const express = require('express');
const { topicController } = require('../controllers/index');

const topicRouter = express.Router();

topicRouter.post('/', topicController.postTopic);
topicRouter.get(
    '/teacher/:teacherId/grade/:gradeId',
    topicController.getTopicByTeacherIdAndGradeId
);
topicRouter.get('/:id', topicController.getTopic);
topicRouter.get('/', topicController.getAllTopics);

module.exports = topicRouter;
