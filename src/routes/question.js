const express = require('express');
const { questionController } = require('../controllers/index');
const { verifyToken, authRole } = require('../middleware/auth');
const role = require('../config/roleConstant');

const questionRouter = express.Router();

questionRouter.get(
    '/question-bank',
    verifyToken,
    authRole(role.ROLE_TEACHER),
    questionController.getQuestionBank
);
questionRouter.get('/:id', verifyToken, questionController.getQuestion);
questionRouter.post('/', verifyToken, authRole(role.ROLE_TEACHER), questionController.postQuestion);
questionRouter.put(
    '/:id',
    verifyToken,
    authRole(role.ROLE_TEACHER),
    questionController.putQuestion
);
questionRouter.delete(
    '/:id',
    verifyToken,
    authRole(role.ROLE_TEACHER),
    questionController.deleteQuestion
);

module.exports = questionRouter;
