const db = require('../models/index');
const { respMapper, errorResp } = require('../helper/helper');

module.exports = {
    findAllRoomOfReceiver: async (receiverId) => {
        try {
            let res = await db.Notification_Room.findAll({
                where: { receiverAccountId: receiverId, isDeleted: 0 },
                attributes: {
                    exclude: ['isDeleted', 'createdAt', 'updatedAt'],
                },
                raw: true,
            });
            const rooms = new Array();
            for (let i = 0; i < res.length; ++i) {
                rooms.push(res[i].room);
            }
            return respMapper(200, rooms);
        } catch (error) {
            if (error.stack) console.log(error.stack);
            throw errorResp(400, error.message);
        }
    },
};
