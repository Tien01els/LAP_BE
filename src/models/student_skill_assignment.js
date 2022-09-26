'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Student_Skill_Assignment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Student_Skill_Assignment.belongsTo(models.Student, {
                foreignKey: 'studentId',
            });
            Student_Skill_Assignment.belongsTo(models.Skill_Assignment, {
                foreignKey: 'skillAssignmentId',
            });
        }
    }
    Student_Skill_Assignment.init(
        {
            score: DataTypes.REAL,
            status: DataTypes.INTEGER,
            dateStart: DataTypes.DATE,
            dateComplete: DataTypes.DATE,
            redo: DataTypes.INTEGER,
            isRedo: DataTypes.BOOLEAN,
            dateRequest: DataTypes.DATE,
            isDeleted: DataTypes.BOOLEAN,
            studentId: DataTypes.INTEGER,
            skillAssignmentId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'Student_Skill_Assignment',
        }
    );
    return Student_Skill_Assignment;
};
