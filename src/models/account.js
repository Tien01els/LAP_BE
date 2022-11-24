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
            Account.hasMany(models.Admin, { foreignKey: 'accountId', as: 'admin' });
            Account.hasMany(models.Parent, { foreignKey: 'accountId', as: 'parent' });
            Account.hasMany(models.Student, { foreignKey: 'accountId', as: 'student' });
            Account.hasMany(models.Teacher, { foreignKey: 'accountId', as: 'teacher' });

            Account.belongsTo(models.Role, { foreignKey: 'roleId', as: 'role' });
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
