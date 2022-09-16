'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('assignment_question', {
            assignmentId: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            assignmentId: {
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
        await queryInterface.dropTable('assignment_question');
    },
};
