'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Teacher extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Teacher.hasMany(models.Class, { foreignKey: 'teacherId', as: 'class' });
            Teacher.hasMany(models.Topic, { foreignKey: 'teacherId', as: 'topic' });
            Teacher.hasMany(models.Assignment, { foreignKey: 'teacherId', as: 'assignment' });
            Teacher.hasMany(models.Question, { foreignKey: 'teacherId', as: 'question' });

            Teacher.belongsTo(models.Account, { foreignKey: 'accountId', as: 'account' });
        }
    }
    Teacher.init(
        {
            fullName: DataTypes.STRING,
            dateOfBirth: DataTypes.DATE,
            gender: DataTypes.BOOLEAN,
            isDeleted: DataTypes.BOOLEAN,
            accountId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'Teacher',
        }
    );
    return Teacher;
};
