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
            title: {
                type: Sequelize.STRING,
            },
            image: {
                type: Sequelize.STRING,
            },
            answer: {
                type: Sequelize.STRING,
            },
            hint: {
                type: Sequelize.STRING,
            },
            isDelete: {
                type: Sequelize.BOOLEAN,
            },
            questionTypeId: {
                type: Sequelize.BOOLEAN,
            },
            skillId: {
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
        await queryInterface.dropTable('questions');
    },
};
