'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('schedules', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            status: {
                type: Sequelize.INTEGER,
            },
            dateStart: {
                type: Sequelize.DATE,
            },
            dateOver: {
                type: Sequelize.DATE,
            },
            timeStart: {
                type: Sequelize.TIME,
            },
            timeOver: {
                type: Sequelize.TIME,
            },
            isDeleted: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
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
        await queryInterface.dropTable('schedules');
    },
};
