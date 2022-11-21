'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('notification_contents', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            senderAccountId: {
                type: Sequelize.INTEGER,
            },
            receiverAccountId: {
                type: Sequelize.INTEGER,
            },
            notificationRoomId: {
                type: Sequelize.INTEGER,
            },
            content: {
                type: Sequelize.TEXT,
            },
            requestUrl: {
                type: Sequelize.TEXT,
            },
            typeNotification: {
                type: Sequelize.STRING,
            },
            tableHandle: {
                type: Sequelize.STRING,
            },
            idTableHandle: {
                type: Sequelize.INTEGER,
            },
            isSeen: {
                type: Sequelize.BOOLEAN,
            },
            isAnswer: {
                type: Sequelize.BOOLEAN,
            },
            dateRequest: {
                type: Sequelize.DATE,
            },
            isDeleted: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('notification_contents');
    },
};
