'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Assignment_Question extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Assignment_Question.belongsTo(models.Assignment, {
                foreignKey: 'assignmentId',
            });
            Assignment_Question.belongsTo(models.Question, {
                foreignKey: 'questionId',
            });
        }
    }
    Assignment_Question.init(
        {
            isDeleted: DataTypes.BOOLEAN,
            assignmentId: DataTypes.INTEGER,
            questionId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'Assignment_Question',
        }
    );
    return Assignment_Question;
};
