'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Topic_Assignment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Topic_Assignment.belongsTo(models.Topic, {
                foreignKey: 'topicId',
                as: 'topic',
            });
            Topic_Assignment.belongsTo(models.Assignment, {
                foreignKey: 'assignmentId',
                as: 'assignment',
            });
        }
    }
    Topic_Assignment.init(
        {
            isDeleted: DataTypes.BOOLEAN,
            topicId: DataTypes.INTEGER,
            assignmentId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'Topic_Assignment',
        }
    );
    return Topic_Assignment;
};
