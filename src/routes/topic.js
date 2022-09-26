const express = require('express');
const { topicController } = require('../controllers/index');

const topicRouter = express.Router();

topicRouter.post('/', topicController.postTopic);
topicRouter.get('/:teacherId/:gradeId', topicController.getTopicByTeacherIdAndGradeId);

module.exports = topicRouter;
