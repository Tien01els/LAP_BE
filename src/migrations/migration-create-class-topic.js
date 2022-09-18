'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('class_topic', {
            classId: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            topicId: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            averageScore: {
                type: Sequelize.REAL,
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
        await queryInterface.dropTable('class_topic');
    },
};
