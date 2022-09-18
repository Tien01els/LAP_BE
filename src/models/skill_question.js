'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Skill_Question extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Skill_Question.belongsTo(models.Skill, {
                foreignKey: 'skillId',
            });
            Skill_Question.belongsTo(models.Question, {
                foreignKey: 'questionId',
            });
        }
    }
    Skill_Question.init(
        {
            isDelete: DataTypes.BOOLEAN,
            skillId: DataTypes.INTEGER,
            questionId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'Skill_Question',
        }
    );
    return Skill_Question;
};
