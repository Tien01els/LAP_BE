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
            Question.hasMany(models.Assignment_Question, {
                foreignKey: 'questionId',
            });

            Question.belongsTo(models.Questiontype, {
                foreignKey: 'questionTypeId',
            });
            Question.belongsTo(models.Skill, {
                foreignKey: 'skillId',
            });
        }
    }
    Question.init(
        {
            title: DataTypes.STRING,
            image: DataTypes.STRING,
            answer: DataTypes.STRING,
            hint: DataTypes.STRING,
            isDelete: DataTypes.BOOLEAN,
            questionTypeId: DataTypes.INTEGER,
            skillId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'Question',
        }
    );
    return Question;
};
