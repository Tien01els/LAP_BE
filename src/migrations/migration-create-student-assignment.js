'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('student_assignment', {
            studentId: {
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
            isQuestion: {
                type: Sequelize.BOOLEAN,
            },
            status: {
                type: Sequelize.INTEGER,
            },
            dateStart: {
                type: Sequelize.DATE,
            },
            dateEnd: {
                type: Sequelize.DATE,
            },
            dateFinish: {
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
        await queryInterface.dropTable('student_assignment');
    },
};
