const db = require('../models/index');
const { respMapper, errorResp } = require('../helper/helper');

module.exports = {
    findAllContentOfReceiver: async (receiverId) => {
        try {
            let res = await db.Notification_Content.findAll({
                where: { receiverAccountId: receiverId, isDeleted: 0 },
                attributes: {
                    exclude: ['isDeleted', 'createdAt', 'updatedAt'],
                },
                order: [['dateRequest', 'DESC']],
                raw: true,
            });
            return respMapper(200, res);
        } catch (error) {
            if (error.stack) console.log(error.stack);
            throw errorResp(400, error.message);
        }
    },
    updateIsSeenNotification: async (id) => {
        try {
            await db.Notification_Content.update(
                { isSeen: true },
                {
                    where: { id, isDeleted: 0 },
                }
            );
            return respMapper(200, 'Notifiaction is seen successfully');
        } catch (error) {
            if (error.stack) console.log(error.stack);
            throw errorResp(400, error.message);
        }
    },
    updateIsSeenAllNotification: async (receiverId) => {
        try {
            await db.Notification_Content.update(
                { isSeen: true },
                {
                    where: { receiverAccountId: receiverId, isDeleted: 0 },
                }
            );
            return respMapper(200, 'All notifiaction is seen successfully');
        } catch (error) {
            if (error.stack) console.log(error.stack);
            throw errorResp(400, error.message);
        }
    },
};
