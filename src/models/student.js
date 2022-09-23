'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Student extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Student.hasMany(models.Student_Topic, { foreignKey: 'studentId' });
            Student.hasMany(models.Student_Assignment, {
                foreignKey: 'studentId',
            });
            Student.hasMany(models.Student_Question, {
                foreignKey: 'studentId',
            });
            Student.hasMany(models.Student_Skill_Assignment, {
                foreignKey: 'studentId',
            });

            Student.belongsTo(models.Account, { foreignKey: 'accountId' });
            Student.belongsTo(models.Parent, { foreignKey: 'parentId' });
            Student.belongsTo(models.Class, { foreignKey: 'classId' });
        }
    }
    Student.init(
        {
            fullName: DataTypes.STRING,
            dateOfBirth: DataTypes.DATE,
            gender: DataTypes.BOOLEAN,
            avatarImg: DataTypes.STRING,
            isDeleted: DataTypes.BOOLEAN,
            accountId: DataTypes.INTEGER,
            parentId: DataTypes.INTEGER,
            classId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'Student',
        }
    );
    return Student;
};
