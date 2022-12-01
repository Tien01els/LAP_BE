const express = require('express');
const { standardController } = require('../controllers/index');
const verifyToken = require('../middleware/auth');

const standardRouter = express.Router();

standardRouter.get('/', verifyToken, standardController.getAllStandards);

module.exports = standardRouter;
