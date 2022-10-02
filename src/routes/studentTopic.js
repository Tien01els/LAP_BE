const express = require('express');
const { studentTopicController } = require('../controllers/index');

const studentTopicRouter = express.Router();

studentTopicRouter.post('/', studentTopicController.postStudentTopic);

module.exports = studentTopicRouter;
