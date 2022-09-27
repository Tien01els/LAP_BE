'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Schedule extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Schedule.belongsTo(models.Class, {
                foreignKey: 'classId',
            });
        }
    }
    Schedule.init(
        {
            status: DataTypes.INTEGER,
            dateStart: DataTypes.DATE,
            dateOver: DataTypes.DATE,
            timeStart: DataTypes.TIME,
            timeOver: DataTypes.TIME,
            isDeleted: DataTypes.BOOLEAN,
            classId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'Schedule',
        }
    );
    return Schedule;
};
