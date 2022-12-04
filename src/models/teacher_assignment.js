'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Teacher_Assignment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Teacher_Assignment.belongsTo(models.Teacher, {
                foreignKey: 'teacherId',
                as: 'teacher',
            });
            Teacher_Assignment.belongsTo(models.Assignment, {
                foreignKey: 'assignmentId',
                as: 'assignment',
            });
        }
    }
    Teacher_Assignment.init(
        {
            dateStart: DataTypes.DATE,
            dateEnd: DataTypes.DATE,
            dateComplete: DataTypes.DATE,
            doTime: DataTypes.INTEGER,
            isDeleted: DataTypes.BOOLEAN,
            teacherId: DataTypes.INTEGER,
            assignmentId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'Teacher_Assignment',
        }
    );
    return Teacher_Assignment;
};
