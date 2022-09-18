'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Assignment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Assignment.hasMany(models.Student_Assignment, {
                foreignKey: 'assigmentId',
            });
            Assignment.hasMany(models.Question, {
                foreignKey: 'assigmentId',
            });

            Assignment.belongsTo(models.Teacher, {
                foreignKey: 'teacherId',
            });
        }
    }
    Assignment.init(
        {
            totalScore: DataTypes.REAL,
            time: DataTypes.INTEGER,
            isDelete: DataTypes.BOOLEAN,
            teacherId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'Assignment',
        }
    );
    return Assignment;
};
