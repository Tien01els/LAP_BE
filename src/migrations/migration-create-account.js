'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('accounts', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            email: {
                type: Sequelize.STRING,
            },
            password: {
                type: Sequelize.STRING,
            },
            avatarImg: {
                type: Sequelize.TEXT,
            },
            refreshToken: {
                type: Sequelize.TEXT,
            },
            isActive: {
                type: Sequelize.BOOLEAN,
                defaultValue: true,
            },
            isDeleted: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
            roleId: {
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
        await queryInterface.dropTable('accounts');
    },
};
