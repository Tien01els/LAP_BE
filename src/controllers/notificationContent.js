const { notificationContentService } = require('../services/index');

module.exports = {
    getContentsOfReceiver: async (req, res) => {
        try {
            let result = await notificationContentService.findAllContentOfReceiver(req.params.receiverId);
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            return res.status(errorStatus).send(error.data);
        }
    },
};
