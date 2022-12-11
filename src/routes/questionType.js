const express = require('express');
const { questionTypeController } = require('../controllers/index');
const { verifyToken, authRole } = require('../middleware/auth');
const role = require('../config/roleConstant');

const questionTypeRouter = express.Router();

questionTypeRouter.get('/', verifyToken, questionTypeController.getAllQuestionTypes);
questionTypeRouter.post(
    '/',
    verifyToken,
    authRole(role.ROLE_ADMIN),
    questionTypeController.postQuestionType
);
questionTypeRouter.delete(
    '/:id',
    verifyToken,
    authRole(role.ROLE_ADMIN),
    questionTypeController.deleteQuestionType
);

module.exports = questionTypeRouter;
