const db = require('../models/index');
const { respMapper, errorResp } = require('../helper/helper');

module.exports = {
    createSkillAssignment: async (skillAssignment) => {
        try {
            return respMapper(201, {
                message: 'Assignment for skill created successfully',
                result: await db.Skill_Assignment.create(skillAssignment),
            });
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
            if (!skillAssignment) return errorResp(409, 'Can not find assignment of skill');
            const assignment = await db.Assignment.findByPk(skillAssignment.assignmentId);
            if (!assignment) return errorResp(409, 'Can not find assignment');

            await db.Student_Assignment.update(
                {
                    isDeleted: true,
                },
                {
                    where: {
                        assignmentId: skillAssignment.assignmentId,
                        isDeleted: false,
                    },
                }
            );

            await assignment.update({ isDeleted: true });
            await skillAssignment.update({ isDeleted: true });
            return respMapper(204, 'Assignment of skill deleted successfully');
        } catch (error) {
            if (error.stack) console.log(error.stack);
            throw errorResp(400, error.message);
        }
    },
};
