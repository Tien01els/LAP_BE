const sequelize = require('sequelize');
const db = require('../models/index');
const { respMapper, errorResp } = require('../helper/helper');

module.exports = {
    findAllSkillInTopicOfStudent: async (studentId, topicId) => {
        try {
            let allSkillInTopicOfStudent = await db.Student_Skill.findAll({
                where: { studentId: studentId, isDeleted: 0 },
                attributes: {
                    exclude: ['isDeleted', 'createdAt', 'updatedAt'],
                },
                right: true,
                include: [
                    {
                        model: db.Skill,
                        as: 'skill',
                        where: { topicId: topicId, isDeleted: 0 },
                        attributes: {
                            exclude: ['isDeleted', 'createdAt', 'updatedAt'],
                        },
                        include: [
                            {
                                model: db.Standard,
                                as: 'standard',
                                where: { isDeleted: 0 },
                                attributes: {
                                    exclude: ['isDeleted', 'createdAt', 'updatedAt'],
                                },
                            },
                        ],
                    },
                ],
            });
            return respMapper(200, allSkillInTopicOfStudent);
        } catch (error) {
            if (error.stack) {
                console.log(error.message);
                console.log(error.stack);
            }
            throw errorResp(400, error.message);
        }
    },
};
