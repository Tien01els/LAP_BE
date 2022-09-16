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
            Skill.hasMany(models.Question, {
                foreignKey: 'skillId',
            });

            Skill.belongsTo(models.Topic, {
                foreignKey: 'topicId',
            });
            Skill.belongsTo(models.Standard, {
                foreignKey: 'standardId',
            });
        }
    }
    Skill.init(
        {
            skillName: DataTypes.STRING,
            isDelete: DataTypes.BOOLEAN,
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
