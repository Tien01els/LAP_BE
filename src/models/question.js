'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Question extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Question.hasMany(models.Skill_Question, {
                foreignKey: 'questionId',
            });
            Question.hasMany(models.Student_Question, {
                foreignKey: 'questionId',
            });
            Question.hasMany(models.Assignment_Question, {
                foreignKey: 'questionId',
            });

            Question.belongsTo(models.Questiontype, {
                foreignKey: 'questionTypeId',
            });
        }
    }
    Question.init(
        {
            content: DataTypes.STRING,
            image: DataTypes.STRING,
            option: DataTypes.STRING,
            level: DataTypes.STRING,
            hint: DataTypes.STRING,
            score: DataTypes.REAL,
            isDeleted: DataTypes.BOOLEAN,
            questionTypeId: DataTypes.INTEGER,
            assignmentId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'Question',
        }
    );
    return Question;
};
