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
            Topic.hasMany(models.Student_Topic, { foreignKey: 'topicId' });
            Topic.hasMany(models.Skill, { foreignKey: 'topicId' });
            Topic.hasMany(models.Topic_Assignment, { foreignKey: 'topicId' });
            Topic.hasOne(models.Topic, {
                foreignKey: 'prerequisiteTopicId',
            });

            Topic.belongsTo(models.Teacher, { foreignKey: 'teacherId' });
            Topic.belongsTo(models.Grade, { foreignKey: 'gradeId' });
            Topic.belongsTo(models.Topic, {
                foreignKey: 'prerequisiteTopicId',
            });
        }
    }
    Topic.init(
        {
            topicName: DataTypes.STRING,
            description: DataTypes.TEXT,
            isDeleted: DataTypes.BOOLEAN,
            teacherId: DataTypes.INTEGER,
            gradeId: DataTypes.INTEGER,
            prerequisiteTopicId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'Topic',
        }
    );
    return Topic;
};
