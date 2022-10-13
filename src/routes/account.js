const express = require('express');
const { accountController } = require('../controllers/index');
const verifyToken = require('../middleware/auth');

const accountRouter = express.Router();

accountRouter.get('/', verifyToken, accountController.getAllAccount);
accountRouter.post('/login', accountController.login);
accountRouter.post('/register', accountController.register);
accountRouter.post('/token', accountController.token);
accountRouter.delete('/logout', verifyToken, accountController.logout);

module.exports = accountRouter;
