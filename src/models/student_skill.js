'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Student_Skill extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Student_Skill.belongsTo(models.Student, {
                foreignKey: 'studentId',
                as: 'student',
            });
            Student_Skill.belongsTo(models.Skill, {
                foreignKey: 'skillId',
                as: 'skill',
            });
        }
    }
    Student_Skill.init(
        {
            status: DataTypes.INTEGER,
            isPass: DataTypes.BOOLEAN,
            isDeleted: DataTypes.BOOLEAN,
            studentId: DataTypes.INTEGER,
            skillId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'Student_Skill',
        }
    );
    return Student_Skill;
};
