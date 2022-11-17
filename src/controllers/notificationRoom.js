const { notificationRoomService } = require('../services/index');

module.exports = {
    getRoomsOfReceiver: async (req, res) => {
        try {
            let result = await notificationRoomService.findAllRoomOfReceiver(req.params.receiverId);
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            return res.status(errorStatus).send(error.data);
        }
    },
};
