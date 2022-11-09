'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Account extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Account.hasMany(models.Admin, { foreignKey: 'accountId' });
            Account.hasMany(models.Parent, { foreignKey: 'accountId' });
            Account.hasMany(models.Student, { foreignKey: 'accountId' });
            Account.hasMany(models.Teacher, { foreignKey: 'accountId' });

            Account.belongsTo(models.Role, { foreignKey: 'roleId' });
        }
    }
    Account.init(
        {
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            avatarImg: DataTypes.TEXT,
            refreshToken: DataTypes.TEXT,
            isActive: DataTypes.BOOLEAN,
            isDeleted: DataTypes.BOOLEAN,
            roleId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'Account',
        }
    );
    return Account;
};
