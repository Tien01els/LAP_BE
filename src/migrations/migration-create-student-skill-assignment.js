'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('student_skill_assignment', {
            studentId: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            skillId: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            assignmentId: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            score: {
                type: Sequelize.REAL,
            },
            status: {
                type: Sequelize.INTEGER,
            },
            dateDue: {
                type: Sequelize.DATE,
            },
            dateStart: {
                type: Sequelize.DATE,
            },
            dateComplete: {
                type: Sequelize.DATE,
            },
            redo: {
                type: Sequelize.INTEGER,
            },
            isRedo: {
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
        await queryInterface.dropTable('student_skill_assignment');
    },
};
