'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('teachers', {
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
            avatarImg: {
                type: Sequelize.TEXT,
            },
            isDeleted: {
                type: Sequelize.BOOLEAN,
            },
            accountId: {
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
        await queryInterface.dropTable('teachers');
    },
};
