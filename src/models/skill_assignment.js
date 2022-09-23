'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Skill_Assignment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Skill_Assignment.hasMany(models.Student_Skill_Assignment, {
                foreignKey: 'skillAssignmentId',
            });

            Skill_Assignment.belongsTo(models.Skill, {
                foreignKey: 'skillId',
            });
            Skill_Assignment.belongsTo(models.Assignment, {
                foreignKey: 'assignmentId',
            });
        }
    }
    Skill_Assignment.init(
        {
            isDeleted: DataTypes.BOOLEAN,
            skillId: DataTypes.INTEGER,
            assignmentId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'Skill_Assignment',
        }
    );
    return Skill_Assignment;
};
