const express = require('express');
const { roleController } = require('../controllers/index');
const verifyToken = require('../middleware/auth');

const roleRouter = express.Router();

roleRouter.get(
    '/',
    verifyToken,
    roleController.getAllRoles
);

module.exports = roleRouter;
