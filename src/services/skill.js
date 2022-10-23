const db = require('../models/index');
const { respMapper, errorResp } = require('../helper/helper');

module.exports = {
    findSkillByTopic: async (topicId) => {
        try {
            let skills = await db.Skill.findAll({
                where: { topicId: topicId, isDeleted: 0 },
                attributes: {
                    exclude: ['topicId', 'isDeleted', 'createdAt', 'updatedAt'],
                },
                raw: true,
            });
            return respMapper(200, skills);
        } catch (error) {
            if (error.stack) console.log(error.stack);
            throw errorResp(400, error.message);
        }
    },
    findAllSkills: async () => {
        try {
            let skills = await db.Skill.findAll({
                where: { isDeleted: 0 },
                attributes: {
                    exclude: ['isDeleted', 'createdAt', 'updatedAt'],
                },
                raw: true,
            });
            return respMapper(200, skills);
        } catch (error) {
            if (error.stack) console.log(error.stack);
            throw errorResp(400, error.message);
        }
    },
    findSkill: async (id) => {
        try {
            let skillAssignmentNew = await db.Skill_Assignment.findByPk(id, {
                where: { isDeleted: 0 },
                attributes: {
                    exclude: ['isDeleted', 'createdAt', 'updatedAt'],
                },
                raw: true,
            });
            return skillAssignmentNew;
        } catch (e) {
            console.log(e);
        }
    },
};
