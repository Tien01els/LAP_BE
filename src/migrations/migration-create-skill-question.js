'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('skill_question', {
            skillid: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            questionId: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER,
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
        await queryInterface.dropTable('skill_question');
    },
};
