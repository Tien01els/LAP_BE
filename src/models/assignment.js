'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Assignment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Assignment.hasMany(models.Student_Assignment, {
                foreignKey: 'assignmentId',
            });
            Assignment.hasMany(models.Question, {
                foreignKey: 'assignmentId',
            });
            Assignment.hasMany(models.Skill_Assignment, {
                foreignKey: 'assignmentId',
            });
            Assignment.hasMany(models.Class_Assignment, {
                foreignKey: 'assignmentId',
            });

            Assignment.belongsTo(models.Teacher, {
                foreignKey: 'teacherId',
            });
        }
    }
    Assignment.init(
        {
            assignmentName: DataTypes.STRING,
            dateDue: DataTypes.DATE,
            time: DataTypes.INTEGER,
            totalScore: DataTypes.REAL,
            isDeleted: DataTypes.BOOLEAN,
            teacherId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'Assignment',
        }
    );
    return Assignment;
};
