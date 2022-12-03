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
                as: 'studentAssignment',
            });
            Assignment.hasMany(models.Assignment_Question, {
                foreignKey: 'assignmentId',
                as: 'assignmentQuestion',
            });
            Assignment.hasMany(models.Skill_Assignment, {
                foreignKey: 'assignmentId',
                as: 'skillAssignment',
            });
            Assignment.hasMany(models.Class_Assignment, {
                foreignKey: 'assignmentId',
                as: 'classAssignment',
            });
            Assignment.hasMany(models.Topic_Assignment, {
                foreignKey: 'assignmentId',
                as: 'topicAssignment',
            });
            Assignment.hasMany(models.Student_Question, {
                foreignKey: 'assignmentId',
                as: 'studentQuestion',
            });
            Assignment.hasMany(models.Teacher_Question, {
                foreignKey: 'assignmentId',
                as: 'teacherQuestion',
            });

            Assignment.belongsTo(models.Teacher, {
                foreignKey: 'teacherId',
                as: 'teacher',
            });
        }
    }
    Assignment.init(
        {
            assignmentName: DataTypes.STRING,
            dateDue: DataTypes.DATE,
            doTime: DataTypes.INTEGER,
            totalScore: DataTypes.REAL,
            passScore: DataTypes.REAL,
            redo: DataTypes.INTEGER,
            typeAssignment: DataTypes.STRING,
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
