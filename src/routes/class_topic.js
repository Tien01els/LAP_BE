const express = require('express');
const { classTopicController } = require('../controllers/index');

const classTopicRouter = express.Router();

classTopicRouter.get(
    '/:teacherId/:classId',
    classTopicController.getTopicsByClassId
);

module.exports = classTopicRouter;
