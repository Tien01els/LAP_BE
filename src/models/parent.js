'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Parent extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Parent.hasMany(models.Student, { foreignKey: 'parentId' });

            Parent.belongsTo(models.Account, { foreignKey: 'accountId' });
        }
    }
    Parent.init(
        {
            fullName: DataTypes.STRING,
            avatarImg: DataTypes.TEXT,
            isDeleted: DataTypes.BOOLEAN,
            accountId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'Parent',
        }
    );
    return Parent;
};
