'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('student_topic', {
            studentId: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            topicId: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            isUnlock: {
                type: Sequelize.BOOLEAN,
            },
            dateRequest: {
                type: Sequelize.DATE,
            },
            isDelete: {
                type: Sequelize.BOOLEAN,
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
        await queryInterface.dropTable('student_topic');
    },
};
