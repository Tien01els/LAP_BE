'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('skill_questions', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            isDeleted: {
                type: Sequelize.BOOLEAN,
            },
            skillid: {
                type: Sequelize.INTEGER,
            },
            questionId: {
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
        await queryInterface.dropTable('skill_questions');
    },
};
