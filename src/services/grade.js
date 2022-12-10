const sequelize = require('sequelize');
const db = require('../models/index');
const { respMapper, errorResp } = require('../helper/helper');

module.exports = {
    findAllGrades: async () => {
        try {
            let grades = await db.Grade.findAll({
                where: { isDeleted: 0 },
                attributes: {
                    exclude: ['isDeleted', 'createdAt', 'updatedAt'],
                },
                raw: true,
            });
            return respMapper(200, grades);
        } catch (error) {
            if (error.stack) {
                console.log(error.message);
                console.log(error.stack);
            }
            throw errorResp(400, error.message);
        }
    },
    findGradeByTeacher: async (teacherId) => {
        try {
            let grades = await db.Class.findAll({
                attributes: ['grade.id', 'grade.gradeName'],
                where: { teacherId, isDeleted: 0 },
                raw: true,
                include: [
                    {
                        attributes: [],
                        model: db.Grade,
                        as: 'grade',
                        where: { isDeleted: 0 },
                        required: false,
                    },
                ],
            });
            return respMapper(200, grades);
        } catch (error) {
            if (error.stack) {
                console.log(error.message);
                console.log(error.stack);
            }
            throw errorResp(400, error.message);
        }
    },
    findRoadMap: async (gradeId) => {
        try {
            let topics = await db.sequelize.query(
                `
                SELECT t.topicName, t.topicImg, pt.topicName AS prerequisiteTopicName, COUNT(s.id) AS numberSkills, t.description, t.id AS topicId 
                FROM topics AS t
                LEFT JOIN topics as pt ON pt.id = t.prerequisiteTopicId AND pt.isDeleted = 0 
                LEFT JOIN skills AS s ON s.topicId = t.id AND s.isDeleted = 0 
                WHERE t.gradeId = :gradeId AND t.isDeleted = 0
                GROUP BY t.id
                ORDER BY pt.id
                `,
                {
                    replacements: { gradeId },
                    type: sequelize.QueryTypes.SELECT,
                }
            );
            return respMapper(200, topics);
        } catch (error) {
            if (error.stack) {
                console.log(error.message);
                console.log(error.stack);
            }
            throw errorResp(400, error.message);
        }
    },
    findGradeOfClass: async (classId) => {
        try {
            let grade = await db.Grade.findOne({
                attributes: {
                    exclude: ['isDeleted', 'createdAt', 'updatedAt'],
                },
                where: { isDeleted: 0 },
                include: [
                    {
                        attributes: [],
                        model: db.Class,
                        as: 'class',
                        where: { id: classId, isDeleted: 0 },
                    },
                ],
            });
            return respMapper(200, grade);
        } catch (error) {
            if (error.stack) {
                console.log(error.message);
                console.log(error.stack);
            }
            throw errorResp(400, error.message);
        }
    },
};
