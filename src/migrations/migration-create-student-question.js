'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('student_question', {
            studentId: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            questionId: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            answer: {
                type: Sequelize.STRING,
            },
            isCorrect: {
                type: Sequelize.BOOLEAN,
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
        await queryInterface.dropTable('student_question');
    },
};
