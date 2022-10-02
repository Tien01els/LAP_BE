const express = require('express');
const { classTopicController } = require('../controllers/index');

const classTopicRouter = express.Router();

classTopicRouter.get(
    '/:teacherId/:classId',
    classTopicController.getTopicsByClassId
);

classTopicRouter.post('/', classTopicController.postClassTopic);
classTopicRouter.delete('/:id', classTopicController.deleteClassTopic);

module.exports = classTopicRouter;
