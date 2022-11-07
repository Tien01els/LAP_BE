'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Student_Question extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Student_Question.belongsTo(models.Student, {
                foreignKey: 'studentId',
            });
            Student_Question.belongsTo(models.Question, {
                foreignKey: 'questionId',
            });
            Student_Question.belongsTo(models.Assignment, {
                foreignKey: 'assignmentId',
            });
        }
    }
    Student_Question.init(
        {
            answer: DataTypes.STRING,
            isCorrect: DataTypes.BOOLEAN,
            isDeleted: DataTypes.BOOLEAN,
            redoTime: DataTypes.INTEGER,
            studentId: DataTypes.INTEGER,
            questionId: DataTypes.INTEGER,
            assignmentId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'Student_Question',
        }
    );
    return Student_Question;
};
