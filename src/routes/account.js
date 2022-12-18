const express = require('express');
const { accountController } = require('../controllers/index');
const { verifyToken, authRole } = require('../middleware/auth');
const role = require('../config/roleConstant');

const accountRouter = express.Router();

accountRouter.get('/', verifyToken, authRole(role.ROLE_ADMIN), accountController.getAllAccount);
accountRouter.get('/profile', verifyToken, accountController.getProfile);

accountRouter.post('/login', accountController.login);
accountRouter.post('/create-account', accountController.createAccount);
accountRouter.post('/refresh-token', accountController.requestRefreshToken);

accountRouter.put('/:id/change-active', verifyToken, accountController.changeActiveAccount);
accountRouter.put('/profile', verifyToken, accountController.editProfile);

accountRouter.delete('/logout', verifyToken, accountController.logout);
accountRouter.delete('/:id', verifyToken, accountController.deleteAccount);

module.exports = accountRouter;
