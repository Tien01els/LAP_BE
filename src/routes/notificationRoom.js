const express = require('express');
const { notificationRoomController } = require('../controllers/index');
const verifyToken = require('../middleware/auth');

const notificationRoomRouter = express.Router();

//verify Token
notificationRoomRouter.get(
    '/receiver/:receiverId',
    verifyToken,
    notificationRoomController.getRoomsOfReceiver
);
notificationRoomRouter.post('/', verifyToken, notificationRoomController.createNotificationRoom);
notificationRoomRouter.delete(
    '/receiver/:receiverId',
    verifyToken,
    notificationRoomController.deleteNotificationRoom
);

module.exports = notificationRoomRouter;
