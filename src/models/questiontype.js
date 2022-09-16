'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Questiontype extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Questiontype.hasMany(models.Question, {
                foreignKey: 'questionTypeId',
            });
        }
    }
    Questiontype.init(
        {
            typeName: DataTypes.STRING,
            isDelete: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: 'Questiontype',
        }
    );
    return Questiontype;
};
