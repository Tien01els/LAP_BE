'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('teacher_questions', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            answer: {
                type: Sequelize.TEXT,
            },
            isCorrect: {
                type: Sequelize.BOOLEAN,
            },
            isDeleted: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
            teacherId: {
                type: Sequelize.INTEGER,
            },
            questionId: {
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
        await queryInterface.dropTable('teacher_questions');
    },
};
