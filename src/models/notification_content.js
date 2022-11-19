'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Notification_Content extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Notification_Content.hasMany(models.Student_Topic, {
                foreignKey: 'notificationContentId',
            });

            Notification_Content.belongsTo(models.Account, { foreignKey: 'senderAccountId' });
            Notification_Content.belongsTo(models.Account, { foreignKey: 'receiverAccountId' });
            Notification_Content.belongsTo(models.Notification_Room, {
                foreignKey: 'notificationRoomId',
            });
        }
    }
    Notification_Content.init(
        {
            senderAccountId: DataTypes.INTEGER,
            receiverAccountId: DataTypes.INTEGER,
            notificationRoomId: DataTypes.INTEGER,
            content: DataTypes.TEXT,
            requestUrl: DataTypes.TEXT,
            typeNotification: DataTypes.STRING,
            typeHandle: DataTypes.STRING,
            idHandle: DataTypes.INTEGER,
            isSeen: DataTypes.BOOLEAN,
            dateRequest: DataTypes.DATE,
            isDeleted: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: 'Notification_Content',
        }
    );
    return Notification_Content;
};
