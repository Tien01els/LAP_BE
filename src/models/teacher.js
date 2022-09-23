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
            Teacher.hasMany(models.Class, { foreignKey: 'teacherId' });
            Teacher.hasMany(models.Topic, { foreignKey: 'teacherId' });
            Teacher.hasMany(models.Skill, { foreignKey: 'teacherId' });
            Teacher.hasMany(models.Assignment, { foreignKey: 'teacherId' });
            Teacher.hasMany(models.Question, { foreignKey: 'teacherId' });

            Teacher.belongsTo(models.Account, { foreignKey: 'accountId' });
        }
    }
    Teacher.init(
        {
            fullName: DataTypes.STRING,
            dateOfBirth: DataTypes.DATE,
            gender: DataTypes.BOOLEAN,
            avatarImg: DataTypes.STRING,
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
