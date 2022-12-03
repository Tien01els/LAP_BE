'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Student_Assignment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Student_Assignment.belongsTo(models.Student, {
                foreignKey: 'studentId',
                as: 'student',
            });
            Student_Assignment.belongsTo(models.Assignment, {
                foreignKey: 'assignmentId',
                as: 'assignment',
            });
        }
    }
    Student_Assignment.init(
        {
            score: DataTypes.REAL,
            status: DataTypes.INTEGER,
            dateDue: DataTypes.DATE,
            dateStart: DataTypes.DATE,
            dateComplete: DataTypes.DATE,
            redo: DataTypes.INTEGER,
            isRedo: DataTypes.BOOLEAN,
            doTime: DataTypes.INTEGER,
            dateRequest: DataTypes.DATE,
            isDeleted: DataTypes.BOOLEAN,
            studentId: DataTypes.INTEGER,
            assignmentId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'Student_Assignment',
        }
    );
    return Student_Assignment;
};
