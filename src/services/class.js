const sequelize = require('sequelize');
const db = require('../models/index');
const { respMapper, errorResp } = require('../helper/helper');

module.exports = {
    findClassInfo: async (id) => {
        try {
            const classInfo = await db.sequelize.query(
                `
                SELECT c.id, c.className, c.classCode, c.classImg, c.year, c.createdAt, ct.numberTopics, ct.averageScore
                FROM classes AS c
                JOIN ( 
                    SELECT classId, COUNT(topicId) AS numberTopics, AVG(averageScore) AS averageScore
                    FROM class_topics
                    WHERE classId = :id AND isDeleted = 0) AS ct
                ON ct.classId = c.id                  
                WHERE c.id = :id AND c.isDeleted = 0
                `,
                {
                    replacements: { id },
                    type: sequelize.QueryTypes.SELECT,
                }
            );
            if (!classInfo[0]) return errorResp(422, 'Class not found');
            const numberStudents = await db.sequelize.query(
                `
                    SELECT COUNT(s.id) AS numberStudents
                    FROM students as s
                    WHERE s.classId = :id AND s.isDeleted = 0
                    `,
                {
                    replacements: { id },
                    type: sequelize.QueryTypes.SELECT,
                }
            );

            classInfo[0] = {
                ...classInfo[0],
                ...numberStudents[0],
            };

            return respMapper(200, classInfo[0]);
        } catch (error) {
            if (error.stack) {
                console.log(error.message);
                console.log(error.stack);
            }
            throw errorResp(400, error.message);
        }
    },
    findClassesByTeacherId: async (teacherId) => {
        try {
            let classes = await db.Class.findAll({
                where: { teacherId: teacherId, isDeleted: 0 },
                attributes: {
                    exclude: ['isDeleted', 'createdAt', 'updatedAt'],
                },
                raw: true,
            });
            return respMapper(200, classes);
        } catch (error) {
            if (error.stack) {
                console.log(error.message);
                console.log(error.stack);
            }
            throw errorResp(400, error.message);
        }
    },
    findClassesByTeacherIdAndGradeId: async (teacherId, gradeId) => {
        try {
            let classes = await db.Class.findAll({
                where: { teacherId, gradeId, isDeleted: 0 },
                attributes: {
                    exclude: ['isDeleted', 'createdAt', 'updatedAt'],
                },
                raw: true,
            });
            return respMapper(200, classes);
        } catch (error) {
            if (error.stack) {
                console.log(error.message);
                console.log(error.stack);
            }
            throw errorResp(400, error.message);
        }
    },

    createClassInfo: async (classInfo) => {
        try {
            const currentClassInfo = await db.Class.findOne({
                where: { className: classInfo.className },
            });
            if (currentClassInfo) return errorResp(409, 'Class has existed');
            await db.Class.create(classInfo);
            return respMapper(201, 'Created class successfully');
        } catch (error) {
            if (error.stack) {
                console.log(error.message);
                console.log(error.stack);
            }
            throw errorResp(400, error.message);
        }
    },

    updateClassInfo: async (id, classInfo) => {
        try {
            const currentClassInfo = await db.Class.findOne({
                where: { className: classInfo.className },
            });
            if (currentClassInfo && currentClassInfo.id === id)
                return errorResp(409, 'The name of the class is the same as another class');
            await db.Class.update(classInfo, {
                where: { id },
            });
            return respMapper(204, 'Updated class successfully');
        } catch (error) {
            if (error.stack) {
                console.log(error.message);
                console.log(error.stack);
            }
            throw errorResp(400, error.message);
        }
    },

    deleteClassInfo: async (id) => {
        try {
            await db.Class.update(
                { isDeleted: true },
                {
                    where: { id },
                }
            );
            return respMapper(204, 'Deleted class successfully');
        } catch (error) {
            if (error.stack) {
                console.log(error.message);
                console.log(error.stack);
            }
            throw errorResp(400, error.message);
        }
    },
};
