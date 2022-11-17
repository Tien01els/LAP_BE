'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Class extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Class.hasMany(models.Student, { foreignKey: 'classId' });
            Class.hasMany(models.Class_Topic, { foreignKey: 'classId' });
            Class.hasMany(models.Class_Assignment, { foreignKey: 'classId' });
            Class.hasMany(models.Schedule, { foreignKey: 'classId' });

            Class.belongsTo(models.Teacher, { foreignKey: 'teacherId' });
            Class.belongsTo(models.Grade, { foreignKey: 'gradeId' });
        }
    }
    Class.init(
        {
            className: DataTypes.STRING,
            classCode: DataTypes.STRING,
            classImg: DataTypes.STRING,
            year: DataTypes.STRING,
            room: DataTypes.TEXT,
            isDeleted: DataTypes.BOOLEAN,
            gradeId: DataTypes.INTEGER,
            teacherId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'Class',
        }
    );
    return Class;
};
