'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('classes', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            className: {
                type: Sequelize.STRING,
            },
            classCode: {
                type: Sequelize.STRING,
            },
            classImg: {
                type: Sequelize.STRING,
            },
            isDelete: {
                type: Sequelize.BOOLEAN,
            },
            gradeId: {
                type: Sequelize.INTEGER,
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
        await queryInterface.dropTable('classes');
    },
};
