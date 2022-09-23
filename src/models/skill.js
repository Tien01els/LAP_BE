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
            });
            Skill.hasMany(models.Skill_Assignment, {
                foreignKey: 'skillId',
            });

            Skill.belongsTo(models.Topic, {
                foreignKey: 'topicId',
            });
            Skill.belongsTo(models.Standard, {
                foreignKey: 'standardId',
            });
            Skill.belongsTo(models.Teacher, {
                foreignKey: 'teacherId',
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
            teacherId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'Skill',
        }
    );
    return Skill;
};
