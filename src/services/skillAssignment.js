const db = require('../models/index');
const { respMapper, errorResp } = require('../helper/helper');

module.exports = {
    createSkillAssignment: async (skillAssignment) => {
        try {
            const skill = await db.Skill.findByPk(newSkillAssignment.skillId, {
                where: { isDeleted: 0 },
            });
            if (!skill) return errorResp(409, 'Skill not found');
            const newSkillAssignment = await db.Skill_Assignment.create(skillAssignment);
            const topicOfSkill = await db.Topic.findByPk(skill.topicId);
            if (!topicOfSkill) return errorResp(409, 'Topic of skill not found');

            const listStudentTopic = await db.Student_Topic.findAll({
                where: { topicId: topicOfSkill.id, isDeleted: 0 },
            });

            const listStudentAssignment = new Array();
            for (let i = 0; i < listStudentTopic.length; ++i)
                if (listStudentTopic[i].isUnlock)
                    listStudentAssignment.push({
                        status: 0,
                        isPass: false,
                        isDeleted: false,
                        studentId: listStudentTopic[i].studentId,
                        skillId: newSkill.id,
                    });

            listStudentAssignment.length &&
                (await db.Student_Assignment.bulkCreate(listStudentAssignment));

            return respMapper(201, {
                message: 'Assignment for skill created successfully',
                result: newSkillAssignment,
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
