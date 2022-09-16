const express = require('express');
const { rolesController } = require('../controllers/index');

const rolesRouter = express.Router();

rolesRouter.get(
    '/',
    rolesController.getAllRoles
);

module.exports = rolesRouter;
