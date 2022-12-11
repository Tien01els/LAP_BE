const express = require('express');
const { roleController } = require('../controllers/index');
const { verifyToken, authRole } = require('../middleware/auth');
const role = require('../config/roleConstant');

const roleRouter = express.Router();

roleRouter.get('/', verifyToken, authRole(role.ROLE_ADMIN), roleController.getAllRoles);
roleRouter.post('/', roleController.postRole);
roleRouter.delete('/:id', authRole(role.ROLE_ADMIN), roleController.deleteRole);

module.exports = roleRouter;
