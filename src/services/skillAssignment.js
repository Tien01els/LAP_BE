const db = require('../models/index');
const { respMapper, errorResp } = require('../helper/helper');

module.exports = {
    createSkillAssignment: async (skillAssignment) => {
        try {
            let skillAssignmentNew = await db.Skill_Assignment.create(skillAssignment);
            return respMapper(200, skillAssignmentNew);
        } catch (error) {
            if (error.stack) console.log(error.stack);
            throw errorResp(400, error.message);
        }
    },
    findAssignmentBySkillId: async (skillId) => {
        try {
            let skillAssignment = await db.Skill_Assignment.findOne({
                where: { skillId, isDeleted: 0 },
                attributes: {
                    exclude: ['isDeleted', 'createdAt', 'updatedAt'],
                },
                raw: true,
            });
            return respMapper(200, skillAssignment);
        } catch (error) {
            if (error.stack) console.log(error.stack);
            throw errorResp(400, error.message);
        }
    },
};
