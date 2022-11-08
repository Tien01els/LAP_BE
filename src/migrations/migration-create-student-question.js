'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('student_questions', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            answer: {
                type: Sequelize.STRING,
            },
            isCorrect: {
                type: Sequelize.BOOLEAN,
            },
            redoTime: {
                type: Sequelize.INTEGER,
            },
            isDeleted: {
                type: Sequelize.BOOLEAN,
            },
            studentId: {
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
        await queryInterface.dropTable('student_questions');
    },
};
