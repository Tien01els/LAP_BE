const express = require('express');
const { notificationRoomController } = require('../controllers/index');
const verifyToken = require('../middleware/auth');

const notificationRoomRouter = express.Router();

//verify Token
notificationRoomRouter.get('/receiver/:receiverId', verifyToken, notificationRoomController.getRoomsOfReceiver);


module.exports = notificationRoomRouter;
