'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Skill extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Skill.hasMany(models.Skill_Question, {
                foreignKey: 'skillId',
                as: 'skillQuestion',
            });
            Skill.hasMany(models.Skill_Assignment, {
                foreignKey: 'skillId',
                as: 'skillAssignment',
            });
            Skill.hasMany(models.Student_Skill, {
                foreignKey: 'skillId',
                as: 'studentSkill',
            });

            Skill.belongsTo(models.Topic, {
                foreignKey: 'topicId',
                as: 'topic',
            });
            Skill.belongsTo(models.Standard, {
                foreignKey: 'standardId',
                as: 'standard',
            });
        }
    }
    Skill.init(
        {
            skillName: DataTypes.STRING,
            description: DataTypes.TEXT,
            isDeleted: DataTypes.BOOLEAN,
            topicId: DataTypes.INTEGER,
            standardId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'Skill',
        }
    );
    return Skill;
};
