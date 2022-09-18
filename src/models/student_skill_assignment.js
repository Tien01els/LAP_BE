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
                foreignKey: 'skillId',
            });
            Student_Skill_Assignment.belongsTo(models.Skill_Assignment, {
                foreignKey: 'assignmentId',
            });
        }
    }
    Student_Skill_Assignment.init(
        {
            studentId: DataTypes.INTEGER,
            skillId: DataTypes.INTEGER,
            assignmentId: DataTypes.INTEGER,
            score: DataTypes.REAL,
            isQuestion: DataTypes.BOOLEAN,
            status: DataTypes.INTEGER,
            dateDue: DataTypes.DATE,
            dateStart: DataTypes.DATE,
            dateFinish: DataTypes.DATE,
            redo: DataTypes.INTEGER,
            isRedo: DataTypes.BOOLEAN,
            dateRequest: DataTypes.DATE,
            isDelete: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: 'Student_Skill_Assignment',
        }
    );
    return Student_Skill_Assignment;
};
