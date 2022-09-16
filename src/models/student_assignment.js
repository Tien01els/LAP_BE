'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Student_Assignment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Student_Assignment.belongsTo(models.Student, {
                foreignKey: 'studentId',
            });
            Student_Assignment.belongsTo(models.Assignment, {
                foreignKey: 'assignmentId',
            });
        }
    }
    Student_Assignment.init(
        {
            studentId: DataTypes.INTEGER,
            assignmentId: DataTypes.INTEGER,
            score: DataTypes.INTEGER,
            isQuestion: DataTypes.BOOLEAN,
            status: DataTypes.INTEGER,
            dateStart: DataTypes.DATE,
            dateEnd: DataTypes.DATE,
            dateFinish: DataTypes.DATE,
            redo: DataTypes.INTEGER,
            isRedo: DataTypes.BOOLEAN,
            dateRequest: DataTypes.DATE,
            isDelete: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: 'Student_Assignment',
        }
    );
    return Student_Assignment;
};
