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

notificationContentRouter.put(
    '/:id/seen-notification',
    verifyToken,
    notificationContentController.seenNotification
);

notificationContentRouter.put(
    '/receiver/:receiverId/seen-all-notification',
    verifyToken,
    notificationContentController.seenAllNotification
);

module.exports = notificationContentRouter;
