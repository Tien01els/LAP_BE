'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('assignments', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            assignmentName: {
                type: Sequelize.STRING,
            },
            dueTime: {
                type: Sequelize.INTEGER,
            },
            doTime: {
                type: Sequelize.INTEGER,
            },
            totalScore: {
                type: Sequelize.REAL,
            },
            passScore: {
                type: Sequelize.REAL,
            },
            redo: {
                type: Sequelize.INTEGER,
            },
            typeAssignment: {
                type: Sequelize.STRING,
            },
            isDeleted: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
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
        await queryInterface.dropTable('assignments');
    },
};
