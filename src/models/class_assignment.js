'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Class_Assignment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Class_Assignment.belongsTo(models.Class, {
                foreignKey: 'classId',
            });
            Class_Assignment.belongsTo(models.Assignment, {
                foreignKey: 'assignmentId',
            });
        }
    }
    Class_Assignment.init(
        {
            dateOpen: DataTypes.DATE,
            dateDue: DataTypes.DATE,
            isDeleted: DataTypes.BOOLEAN,
            classId: DataTypes.INTEGER,
            assignmentId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'Class_Assignment',
        }
    );
    return Class_Assignment;
};
