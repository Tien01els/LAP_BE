'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('teacher_assignments', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            dateStart: {
                type: Sequelize.DATE,
            },
            dateEnd: {
                type: Sequelize.DATE,
            },
            dateComplete: {
                type: Sequelize.DATE,
            },
            doTime: {
                type: Sequelize.INTEGER,
            },
            isDeleted: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
            teacherId: {
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
        await queryInterface.dropTable('teacher_assignments');
    },
};
