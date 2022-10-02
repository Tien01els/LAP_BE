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
                foreignKey: 'assigmentId',
            });
            Assignment.hasMany(models.Question, {
                foreignKey: 'assigmentId',
            });
            Assignment.hasMany(models.Skill_Assignment, {
                foreignKey: 'assigmentId',
            });
            Assignment.hasMany(models.Class_Assignment, {
                foreignKey: 'assigmentId',
            });

            Assignment.belongsTo(models.Teacher, {
                foreignKey: 'teacherId',
            });
        }
    }
    Assignment.init(
        {
            name: DataTypes.STRING,
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
