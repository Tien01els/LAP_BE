'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Class_Topic extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Class_Topic.belongsTo(models.Class, { foreignKey: 'classId' });
            Class_Topic.belongsTo(models.Topic, { foreignKey: 'topicId' });
        }
    }
    Class_Topic.init(
        {
            averageScore: DataTypes.REAL,
            isDelete: DataTypes.BOOLEAN,
            classId: DataTypes.INTEGER,
            topicId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'Class_Topic',
        }
    );
    return Class_Topic;
};
