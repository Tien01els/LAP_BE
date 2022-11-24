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
            let skillAssignment = await db.Skill_Assignment.findAll({
                where: { skillId, isDeleted: 0 },
                attributes: {
                    exclude: ['isDeleted', 'createdAt', 'updatedAt'],
                },
                include: [
                    {
                        model: db.Assignment,
                        as: 'assignment',
                        where: { isDeleted: 0 },
                        require: false,
                    },
                ],
            });
            return respMapper(200, skillAssignment);
        } catch (error) {
            if (error.stack) console.log(error.stack);
            throw errorResp(400, error.message);
        }
    },
    deleteAssignmentBySkillId: async (id) => {
        try {
            let skillAssignment = await db.Skill_Assignment.findByPk(id);
            if (!skillAssignment) return errorResp(400, 'Can not find assignment of skill');
            const assignment = await db.Assignment.findByPk(skillAssignment.assignmentId);
            if (assignment) {
                assignment.isDeleted = true;
                await assignment.save();
            }
            return respMapper(204, await skillAssignment.update({ isDeleted: true }));
        } catch (error) {
            if (error.stack) console.log(error.stack);
            throw errorResp(400, error.message);
        }
    },
};
