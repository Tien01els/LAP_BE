const { notificationRoomService } = require('../services/index');

module.exports = {
    getRoomsOfReceiver: async (req, res) => {
        try {
            const result = await notificationRoomService.findAllRoomOfReceiver(
                req.params.receiverId
            );
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            return res.status(errorStatus).send(error.data);
        }
    },
    createNotificationRoom: async (req, res) => {
        try {
            const senderAccountId = req.accountId;
            const receiverEmail = req.body.userEmail;
            const result = await notificationRoomService.createNotificationRoom(
                senderAccountId,
                receiverEmail
            );
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            return res.status(errorStatus).send(error.data);
        }
    },
    deleteNotificationRoom: async (req, res) => {
        try {
            const senderAccountId = req.accountId;
            const receiverAccountId = req.params.receiverId;
            const result = await notificationRoomService.deleteNotificationRoom(
                senderAccountId,
                receiverAccountId
            );
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            return res.status(errorStatus).send(error.data);
        }
    },
};
