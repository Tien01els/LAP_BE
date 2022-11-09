'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('students', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            fullName: {
                type: Sequelize.STRING,
            },
            dateOfBirth: {
                type: Sequelize.DATE,
            },
            gender: {
                type: Sequelize.BOOLEAN,
            },
            averageScore: {
                type: Sequelize.REAL,
            },
            isDeleted: {
                type: Sequelize.BOOLEAN,
            },
            accountId: {
                type: Sequelize.INTEGER,
            },
            parentId: {
                type: Sequelize.INTEGER,
            },
            classId: {
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
        await queryInterface.dropTable('students');
    },
};
