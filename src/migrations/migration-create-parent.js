'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('parents', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            fullName: {
                type: Sequelize.STRING,
            },
            avatarImg: {
                type: Sequelize.TEXT,
            },
            isDeleted: {
                type: Sequelize.BOOLEAN,
            },
            accountId: {
                type: Sequelize.BOOLEAN,
            },
            studentId: {
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
        await queryInterface.dropTable('parents');
    },
};
