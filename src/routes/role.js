const express = require('express');
const { roleController } = require('../controllers/index');
const { verifyToken, authRole } = require('../middleware/auth');
const role = require('../config/roleConstant');

const roleRouter = express.Router();

roleRouter.get('/', verifyToken, roleController.getAllRoles);

module.exports = roleRouter;
