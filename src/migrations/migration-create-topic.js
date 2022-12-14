'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('topics', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            topicName: {
                type: Sequelize.STRING,
            },
            description: {
                type: Sequelize.TEXT,
            },
            isDelete: {
                type: Sequelize.BOOLEAN,
            },
            teacherId: {
                type: Sequelize.INTEGER,
            },
            gradeId: {
                type: Sequelize.INTEGER,
            },
            prerequisiteTopicId: {
                type: Sequelize.INTEGER,
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
        await queryInterface.dropTable('topics');
    },
};
