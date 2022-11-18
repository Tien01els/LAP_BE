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
};
