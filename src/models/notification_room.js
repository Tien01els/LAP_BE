'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Notification_Room extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Notification_Room.hasMany(models.Notification_Content, {
                foreignKey: 'notificationRoomId',
            });

            Notification_Room.belongsTo(models.Account, { foreignKey: 'senderAccountId' });
            Notification_Room.belongsTo(models.Account, { foreignKey: 'receiverAccountId' });
        }
    }
    Notification_Room.init(
        {
            room: DataTypes.TEXT,
            senderAccountId: DataTypes.INTEGER,
            receiverAccountId: DataTypes.INTEGER,
            isDeleted: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: 'Notification_Room',
        }
    );
    return Notification_Room;
};
