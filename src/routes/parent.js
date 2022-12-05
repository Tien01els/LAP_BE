const express = require('express');
const { parentController } = require('../controllers/index');
const verifyToken = require('../middleware/auth');

const parentRouter = express.Router();

parentRouter.get('/student', verifyToken, parentController.getStudentOfParent);

module.exports = parentRouter;
