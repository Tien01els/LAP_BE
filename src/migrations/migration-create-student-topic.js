'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('student_topics', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            status: {
                type: Sequelize.BOOLEAN,
            },
            isUnlock: {
                type: Sequelize.BOOLEAN,
            },
            dateRequest: {
                type: Sequelize.DATE,
            },
            isDeleted: {
                type: Sequelize.BOOLEAN,
            },
            studentId: {
                type: Sequelize.INTEGER,
            },
            topicId: {
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
        await queryInterface.dropTable('student_topics');
    },
};
