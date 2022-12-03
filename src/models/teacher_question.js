'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Teacher_Question extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Teacher_Question.belongsTo(models.Teacher, {
                foreignKey: 'teacherId',
                as: 'teacher',
            });
            Teacher_Question.belongsTo(models.Question, {
                foreignKey: 'questionId',
                as: 'question',
            });
            Teacher_Question.belongsTo(models.Assignment, {
                foreignKey: 'assignmentId',
                as: 'assignment',
            });
        }
        
    }
    Teacher_Question.init(
        {
            answer: DataTypes.TEXT,
            isCorrect: DataTypes.BOOLEAN,
            isDeleted: DataTypes.BOOLEAN,
            teacherId: DataTypes.INTEGER,
            questionId: DataTypes.INTEGER,
            assignmentId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'Teacher_Question',
        }
    );
    return Teacher_Question;
};
