const express = require('express');
const { standardController } = require('../controllers/index');

const standardRouter = express.Router();

standardRouter.get('/', standardController.getAllStandards);

module.exports = standardRouter;
