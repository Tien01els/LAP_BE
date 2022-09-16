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
            Assignment.hasMany(models.Assignment_Question, {
                foreignKey: 'assigmentId',
            });
        }
    }
    Assignment.init(
        {
            time: DataTypes.INTEGER,
            isDelete: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: 'Assignment',
        }
    );
    return Assignment;
};
