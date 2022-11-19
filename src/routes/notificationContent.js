const express = require('express');
const { notificationContentController } = require('../controllers/index');
const verifyToken = require('../middleware/auth');

const notificationContentRouter = express.Router();

//verify Token
notificationContentRouter.get(
    '/receiver/:receiverId',
    verifyToken,
    notificationContentController.getContentsOfReceiver
);

module.exports = notificationContentRouter;
