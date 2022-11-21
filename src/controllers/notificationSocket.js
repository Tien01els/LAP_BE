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
                    tableHandle,
                    idTableHandle,
                    answer,
                } = data;

                let notificationContent;
                const notificationRoom = await db.Notification_Room.findOne({
                    where: {
                        senderAccountId: senderId,
                        receiverAccountId: receiverId,
                        isDeleted: false,
                    },
                });
                if (tableHandle === 'Student_Topic') {
                    const studentTopic = await db.Student_Topic.findByPk(idTableHandle, {
                        where: { isDeleted: 0 },
                        attributes: {
                            exclude: ['isDeleted', 'createdAt', 'updatedAt'],
                        },
                    });
                    studentTopic.isUnlock = answer;
                    studentTopic.status = 0;
                    await studentTopic.save();
                    const topic = await db.Topic.findByPk(studentTopic.topicId, {
                        where: { isDeleted: 0 },
                        attributes: {
                            exclude: ['isDeleted', 'createdAt', 'updatedAt'],
                        },
                        raw: true,
                    });
                    await db.Notification_Content.update(
                        { isAnswer: true },
                        { where: { id: notificationContentId } }
                    );
                    notificationContent = await db.Notification_Content.create({
                        senderAccountId: senderId,
                        receiverAccountId: receiverId,
                        notificationRoomId: notificationContentId,
                        content: `Topic ${topic.topicName} unlock request ${
                            answer ? 'accepted' : 'denied'
                        }`,
                        requestURL: `topic/${topic.id}`,
                        typeNotification: `Unlock`,
                        isSeen: false,
                        isAnswer: false,
                        dateRequest: new Date(),
                        tableHandle,
                        idTableHandle,
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
                const { senderId, userId, topicId, tableHandle, idTableHandle } = data;
                const student = await db.Student.findByPk(userId, {
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
                    isAnswer: false,
                    dateRequest: new Date(),
                    tableHandle: tableHandle,
                    idTableHandle: idTableHandle,
                });
                await db.Student_Topic.update(
                    {
                        notificationContentId: notificationContent.id,
                        dateRequest: new Date(),
                    },
                    {
                        where: {
                            studentId: userId,
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
