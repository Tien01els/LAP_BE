'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('questions', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            content: {
                type: Sequelize.STRING,
            },
            image: {
                type: Sequelize.STRING,
            },
            option: {
                type: Sequelize.TEXT,
            },
            level: {
                type: Sequelize.STRING,
            },
            hint: {
                type: Sequelize.STRING,
            },
            score: {
                type: Sequelize.REAL,
            },
            isDeleted: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
            questionTypeId: {
                type: Sequelize.INTEGER,
            },
            teacherId: {
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
        await queryInterface.dropTable('questions');
    },
};
