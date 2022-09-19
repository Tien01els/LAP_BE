const express = require('express');
const { roleController } = require('../controllers/index');

const roleRouter = express.Router();

roleRouter.get(
    '/',
    roleController.getAllRoles
);

module.exports = roleRouter;
