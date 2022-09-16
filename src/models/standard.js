'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Standard extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Standard.hasMany(models.Skill, { foreignKey: 'standardId' });
        }
    }
    Standard.init(
        {
            standardName: DataTypes.STRING,
            standardCode: DataTypes.STRING,
            isDelete: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: 'Standard',
        }
    );
    return Standard;
};
