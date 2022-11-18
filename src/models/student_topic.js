'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Student_Topic extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Student_Topic.belongsTo(models.Student, {
                foreignKey: 'studentId',
            });
            Student_Topic.belongsTo(models.Topic, { foreignKey: 'topicId' });
            Student_Topic.belongsTo(models.Notification_Content, {
                foreignKey: 'notificationContentId',
            });
        }
    }
    Student_Topic.init(
        {
            status: DataTypes.INTEGER,
            isUnlock: DataTypes.BOOLEAN,
            dateRequest: DataTypes.DATE,
            isPass: DataTypes.BOOLEAN,
            isDeleted: DataTypes.BOOLEAN,
            studentId: DataTypes.INTEGER,
            topicId: DataTypes.INTEGER,
            notificationContentId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'Student_Topic',
        }
    );
    return Student_Topic;
};
