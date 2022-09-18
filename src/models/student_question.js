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
        }
    }
    Student_Question.init(
        {
            studentId: DataTypes.INTEGER,
            questionId: DataTypes.INTEGER,
            isCorrect: DataTypes.BOOLEAN,
            isDelete: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: 'Student_Question',
        }
    );
    return Student_Question;
};
