'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('class_assignments', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            status: {
                type: Sequelize.INTEGER,
            },
            dateDue: {
                type: Sequelize.DATE,
            },
            redo: {
                type: Sequelize.INTEGER,
            },
            isDeleted: {
                type: Sequelize.BOOLEAN,
            },
            classId: {
                type: Sequelize.INTEGER,
            },
            assignmentId: {
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
        await queryInterface.dropTable('class_assignments');
    },
};
