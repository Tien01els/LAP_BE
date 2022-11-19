const db = require('../models/index');
const { assignmentService } = require('../services/index');

module.exports = {
    connection: (socket) => {
        socket.on('rooms', (data) => {
            for (let i = 0; i < data.length; i++) {
                socket.join(data[i]);
            }
            // _io.to('1').emit('vui ve ko quau nha 2', 'Tao muon dam no');
        });

        socket.on('vui ve ko quau nha', (data) => {
            socket.to('1').emit('vui ve ko quau nha 2', {
                data: data.content,
                senderId: data.senderId,
            });
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
                console.log(notificationContent);
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
