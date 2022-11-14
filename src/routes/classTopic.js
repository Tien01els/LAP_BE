const express = require('express');
const { classTopicController } = require('../controllers/index');
const verifyToken = require('../middleware/auth');

const classTopicRouter = express.Router();

//verify Token
classTopicRouter.get(
    '/teacher/class/:classId',
    verifyToken,
    classTopicController.getTopicsOfTeacherByClass
);

classTopicRouter.get(
    '/student/class/:classId',
    verifyToken,
    classTopicController.getTopicsOfClassForStudent
);
classTopicRouter.post('/', classTopicController.postClassTopic);
classTopicRouter.delete('/:id', classTopicController.deleteClassTopic);


module.exports = classTopicRouter;
