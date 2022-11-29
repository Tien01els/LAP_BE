const db = require('../models/index');
const { respMapper, errorResp } = require('../helper/helper');
const { v4: uuidv4 } = require('uuid');

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
    createNotificationRoom: async (senderAccountId, receiverEmail) => {
        try {
            const receiverAccount = await db.Account.findOne({ where: { email: receiverEmail } });
            const roomId = uuidv4();
            const newRoom = [
                {
                    senderAccountId: senderAccountId,
                    receiverAccountId: receiverAccount.id,
                    room: roomId,
                    isDeleted: false,
                },
                {
                    senderAccountId: receiverAccount.id,
                    receiverAccountId: senderAccountId,
                    room: roomId,
                    isDeleted: false,
                },
            ];
            let res = await db.Notification_Room.bulkCreate(newRoom);
            return respMapper(200, res);
        } catch (error) {
            if (error.stack) console.log(error.stack);
            throw errorResp(400, error.message);
        }
    },
    deleteNotificationRoom: async (senderAccountId, receiverAccountId) => {
        try {
            await db.Notification_Room.update(
                {
                    isDeleted: true,
                },
                {
                    where: { senderAccountId, receiverAccountId },
                }
            );
            await db.Notification_Room.update(
                {
                    isDeleted: true,
                },
                {
                    where: {
                        senderAccountId: receiverAccountId,
                        receiverAccountId: senderAccountId,
                    },
                }
            );
            return respMapper(204);
        } catch (error) {
            if (error.stack) console.log(error.stack);
            throw errorResp(400, error.message);
        }
    },
};
