'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Grade extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Grade.hasMany(models.Class, { foreignKey: 'gradeId' });
            Grade.hasMany(models.Topic, { foreignKey: 'gradeId' });
        }
    }
    Grade.init(
        {
            gradeName: DataTypes.STRING,
            isDeleted: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: 'Grade',
        }
    );
    return Grade;
};
