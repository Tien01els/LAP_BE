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
            Topic.hasMany(models.Class_Topic, { foreignKey: 'topicId', as: 'classTopic' });
            Topic.hasMany(models.Student_Topic, { foreignKey: 'topicId', as: 'studentTopic' });
            Topic.hasMany(models.Skill, { foreignKey: 'topicId', as: 'skill' });
            Topic.hasMany(models.Topic_Assignment, {
                foreignKey: 'topicId',
                as: 'topicAssignment',
            });
            Topic.hasOne(models.Topic, {
                foreignKey: 'prerequisiteTopicId',
                as: 'topic',
            });

            Topic.belongsTo(models.Teacher, { foreignKey: 'teacherId', as: 'teacher' });
            Topic.belongsTo(models.Grade, { foreignKey: 'gradeId', as: 'grade' });
            Topic.belongsTo(models.Topic, {
                foreignKey: 'prerequisiteTopicId',
                as: 'prerequisiteTopic',
            });
        }
    }
    Topic.init(
        {
            topicName: DataTypes.STRING,
            description: DataTypes.TEXT,
            topicImg: DataTypes.TEXT,
            isUnlock: DataTypes.BOOLEAN,
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
