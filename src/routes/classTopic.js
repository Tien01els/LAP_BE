const express = require('express');
const { classTopicController } = require('../controllers/index');
const { verifyToken, authRole } = require('../middleware/auth');
const role = require('../config/roleConstant');

const classTopicRouter = express.Router();

//verify Token
classTopicRouter.get(
    '/teacher/class/:classId',
    verifyToken,
    authRole(role.ROLE_TEACHER),
    classTopicController.getTopicsOfTeacherByClass
);

classTopicRouter.get(
    '/student/class/:classId',
    verifyToken,
    authRole(role.ROLE_STUDENT),
    classTopicController.getTopicsOfClassForStudent
);
classTopicRouter.get(
    '/class/:classId/roadmap',
    verifyToken,
    classTopicController.getRoadMap
);
classTopicRouter.post(
    '/',
    verifyToken,
    authRole(role.ROLE_TEACHER),
    classTopicController.postClassTopic
);
classTopicRouter.delete(
    '/:id',
    verifyToken,
    authRole(role.ROLE_TEACHER),
    classTopicController.deleteClassTopic
);


module.exports = classTopicRouter;
