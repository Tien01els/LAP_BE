const express = require('express');
const { standardController } = require('../controllers/index');
const { verifyToken, authRole } = require('../middleware/auth');
const role = require('../config/roleConstant');

const standardRouter = express.Router();

standardRouter.get('/', verifyToken, standardController.getAllStandards);

module.exports = standardRouter;
