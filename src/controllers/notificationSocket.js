const db = require('../models/index');
const { assignmentService } = require('../services/index');

const getUserInfo = async (accountId, roleId) => {
    if (roleId === 1)
        return await db.Admin.findOne({
            where: { accountId, isDeleted: 0 },
            attributes: {
                exclude: ['isDeleted', 'createdAt', 'updatedAt'],
            },
            raw: true,
        });
    if (roleId === 2)
        return await db.Teacher.findOne({
            where: { accountId, isDeleted: 0 },
            attributes: {
                exclude: ['isDeleted', 'createdAt', 'updatedAt'],
            },
            raw: true,
        });
    if (roleId === 3)
        return await db.Student.findOne({
            where: { accountId, isDeleted: 0 },
            attributes: {
                exclude: ['isDeleted', 'createdAt', 'updatedAt'],
            },
            raw: true,
        });
    if (roleId === 4)
        return await db.Parent.findOne({
            where: { accountId, isDeleted: 0 },
            attributes: {
                exclude: ['isDeleted', 'createdAt', 'updatedAt'],
            },
            raw: true,
        });
};

module.exports = {
    connection: (socket) => {
        socket.on('rooms', (data) => {
            for (let i = 0; i < data.length; i++) {
                socket.join(data[i]);
            }
            // _io.to('1').emit('vui ve ko quau nha 2', 'Tao muon dam no');
        });

        socket.on('send-handle-request-notification', async (data) => {
            try {
                const {
                    senderId,
                    receiverId,
                    notificationContentId,
                    typeHandle,
                    idHandle,
                    answer,
                    userId,
                    senderRoleId,
                    receiverRoleId,
                } = data;

                const senderInfo = await getUserInfo(senderId, senderRoleId);
                const receiverInfo = await getUserInfo(receiverId, receiverRoleId);
                console.log(userInfo);
                let notificationContent;
                const notificationRoom = await db.Notification_Room.findOne({
                    senderAccountId: senderId,
                    receiverAccountId: receiverId,
                });

                if (typeHandle === 'Student_Topic') {
                    const studentTopic = await db.Student_Topic.update(
                        {
                            isUnlock: answer,
                        },
                        {
                            where: { id: idHandle, isDeleted: 0 },
                            attributes: {
                                exclude: ['isDeleted', 'createdAt', 'updatedAt'],
                            },
                            raw: true,
                        }
                    );
                    const topic = await db.Topic.findByPk(studentTopic.topicId, {
                        where: { isDeleted: 0 },
                        attributes: {
                            exclude: ['isDeleted', 'createdAt', 'updatedAt'],
                        },
                        raw: true,
                    });
                    notificationContent = await db.Notification_Content.create({
                        senderAccountId: senderId,
                        receiverAccountId: receiverId,
                        notificationRoomId: notificationContentId,
                        content: `Topic ${topic.topicName} unlock request ${
                            answer ? 'accepted' : 'denied'
                        } `,
                        requestURL: `topic/${topic.id}`,
                        typeNotification: `Unlock`,
                        isSeen: false,
                        dateRequest: new Date(),
                        typeHandle: typeHandle,
                    });
                }

                socket
                    .to(notificationRoom.room)
                    .emit('get-handle-request-notification', notificationContent);
            } catch (error) {
                console.log(error.message);
            }
        });

        socket.on('send-request-unlock-topic', async (data) => {
            try {
                const senderId = data.senderId;
                const studentId = data.userId;
                const topicId = data.topicId;
                const typeHandle = data.typeHandle;

                const student = await db.Student.findByPk(studentId, {
                    where: { isDeleted: 0 },
                    attributes: {
                        exclude: ['isDeleted', 'createdAt', 'updatedAt'],
                    },
                    raw: true,
                });
                const topic = await db.Topic.findByPk(topicId, {
                    where: { isDeleted: 0 },
                    attributes: {
                        exclude: ['isDeleted', 'createdAt', 'updatedAt'],
                    },
                    raw: true,
                });
                const teacher = await db.Teacher.findByPk(topic.teacherId, {
                    where: { isDeleted: 0 },
                    attributes: {
                        exclude: ['isDeleted', 'createdAt', 'updatedAt'],
                    },
                    raw: true,
                });
                const notificationRoom = await db.Notification_Room.findOne({
                    where: {
                        senderAccountId: senderId,
                        receiverAccountId: teacher.accountId,
                        isDeleted: 0,
                    },
                    attributes: {
                        exclude: ['isDeleted', 'createdAt', 'updatedAt'],
                    },
                    raw: true,
                });
                const notificationContent = await db.Notification_Content.create({
                    senderAccountId: senderId,
                    receiverAccountId: teacher.accountId,
                    notificationRoomId: notificationRoom.id,
                    content: `${student.fullName} sent a request to unlock topic ${topic.topicName}`,
                    requestURL: `student/${student.id}`,
                    typeNotification: `Unlock`,
                    isSeen: false,
                    dateRequest: new Date(),
                    typeHandle: typeHandle,
                });
                await db.Student_Topic.update(
                    {
                        notificationContentId: notificationContent.id,
                        dateRequest: new Date(),
                    },
                    {
                        where: {
                            studentId: studentId,
                            topicId: topicId,
                            isDeleted: false,
                        },
                    }
                );
                socket
                    .to(notificationRoom.room)
                    .emit('get-request-unlock-topic', notificationContent);
            } catch (error) {
                console.log(error.message);
            }
        });
    },
};
