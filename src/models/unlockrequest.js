'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Unlockrequest extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Unlockrequest.belongsTo(models.Topic, { foreignKey: 'topicId' });
            Unlockrequest.belongsTo(models.Student, { foreignKey: 'studentId' });
        }
    }
    Unlockrequest.init(
        {
            studentId: DataTypes.INTEGER,
            topicId: DataTypes.INTEGER,
            isUnlock: DataTypes.BOOLEAN,
            dateRequest: DataTypes.DATE,
            isDelete: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: 'Unlockrequest',
        }
    );
    return Unlockrequest;
};
