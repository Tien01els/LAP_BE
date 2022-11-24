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
            Student.hasMany(models.Student_Topic, { foreignKey: 'studentId', as: 'studentTopic' });
            Student.hasMany(models.Student_Assignment, {
                foreignKey: 'studentId',
                as: 'studentAssignment',
            });
            Student.hasMany(models.Student_Question, {
                foreignKey: 'studentId',
                as: 'studentQuestion',
            });
            Student.hasMany(models.Student_Skill, {
                foreignKey: 'studentId',
                as: 'studentSkill',
            });

            Student.belongsTo(models.Account, {
                foreignKey: 'accountId',
                as: 'account',
            });
            Student.belongsTo(models.Parent, { foreignKey: 'parentId', as: 'parent' });
            Student.belongsTo(models.Class, { foreignKey: 'classId', as: 'class' });
        }
    }
    Student.init(
        {
            fullName: DataTypes.STRING,
            dateOfBirth: DataTypes.DATE,
            gender: DataTypes.BOOLEAN,
            averageScore: DataTypes.REAL,
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
