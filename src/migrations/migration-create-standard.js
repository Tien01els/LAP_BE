'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('standards', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            standardName: {
                type: Sequelize.STRING,
            },
            standardCode: {
                type: Sequelize.STRING,
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
        await queryInterface.dropTable('standards');
    },
};
