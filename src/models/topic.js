'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Topic extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Topic.hasMany(models.Class_Topic, { foreignKey: 'topicId' });
            Topic.hasMany(models.Unlockrequest, { foreignKey: 'topicId' });
            Topic.hasMany(models.Skill, { foreignKey: 'topicId' });

            Topic.belongsTo(models.Teacher, { foreignKey: 'teacherId' });
        }
    }
    Topic.init(
        {
            topicName: DataTypes.STRING,
            isDelete: DataTypes.BOOLEAN,
            teacherId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'Topic',
        }
    );
    return Topic;
};
