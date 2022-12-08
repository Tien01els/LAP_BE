const sequelize = require('sequelize');
const db = require('../models/index');
const { respMapper, errorResp } = require('../helper/helper');

module.exports = {
    createSkillAssignment: async (skillAssignment) => {
        try {
            const skill = await db.Skill.findByPk(skillAssignment.skillId, {
                where: { isDeleted: 0 },
            });
            if (!skill) return errorResp(409, 'Skill not found');
            const assignment = await db.Assignment.findByPk(skillAssignment.assignmentId, {
                where: { isDeleted: 0 },
            });
            if (!assignment) return errorResp(409, 'Assignment not found');
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
                        studentId: listStudentTopic[i].studentId,
                        assignmentId: assignment.id,
                        status: 0,
                        dateDue: assignment.dateDue,
                        // dateDue: new Date(
                        //     new Date().getTime() +
                        //         24 * 60 * 60 * parseInt(assignment.dueTime) * 1000
                        // ),
                        redo: assignment.redo,
                        isRedo: false,
                        isDeleted: false,
                    });

            listStudentAssignment.length &&
                (await db.Student_Assignment.bulkCreate(listStudentAssignment));

            return respMapper(201, {
                message: 'Assignment for skill created successfully',
                result: newSkillAssignment,
            });
        } catch (error) {
            if (error.stack) {
                console.log(error.message);
                console.log(error.stack);
            }
            throw errorResp(400, error.message);
        }
    },
    findAllAssignmentBySkillId: async (skillId) => {
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
                        required: false,
                    },
                ],
            });
            return respMapper(200, skillAssignment);
        } catch (error) {
            if (error.stack) {
                console.log(error.message);
                console.log(error.stack);
            }
            throw errorResp(400, error.message);
        }
    },
    findAllAssignmentInSkillOfStudent: async (studentId, skillId) => {
        try {
            let assignmentOfSkillOfstudent = await db.Skill_Assignment.findAll({
                where: { skillId, isDeleted: 0 },
                attributes: {
                    exclude: ['isDeleted', 'createdAt', 'updatedAt'],
                },
                include: [
                    {
                        attributes: {
                            exclude: ['isDeleted', 'createdAt', 'updatedAt'],
                        },
                        model: db.Assignment,
                        as: 'assignment',
                        where: { isDeleted: 0 },
                        required: false,
                        include: [
                            {
                                attributes: {
                                    exclude: ['isDeleted', 'createdAt', 'updatedAt'],
                                },
                                model: db.Student_Assignment,
                                as: 'studentAssignment',
                                where: { studentId: studentId, isDeleted: 0 },
                                required: false,
                            },
                        ],
                    },
                ],
            });
            for (let i = 0; i < assignmentOfSkillOfstudent.length; ++i) {
                let assignment = await db.Assignment.findByPk(
                    assignmentOfSkillOfstudent[i].assignmentId,
                    {
                        where: { isDeleted: 0 },
                        attributes: [
                            'id',
                            [
                                sequelize.fn('COUNT', sequelize.col('assignmentQuestion.id')),
                                'numberQuestionOfAssignment',
                            ],
                        ],
                        include: [
                            {
                                attributes: [],
                                model: db.Assignment_Question,
                                as: 'assignmentQuestion',
                                where: { isDeleted: 0 },
                                required: false,
                            },
                        ],
                        group: 'id',
                        raw: true,
                    }
                );
                assignmentOfSkillOfstudent[i].dataValues.numberQuestionOfAssignment =
                    assignment.numberQuestionOfAssignment;
            }
            return respMapper(200, assignmentOfSkillOfstudent);
        } catch (error) {
            if (error.stack) {
                console.log(error.message);
                console.log(error.stack);
            }
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

            await db.Assignment_Question.update(
                { isDeleted: true },
                {
                    where: { assignmentId: id, isDeleted: false },
                }
            );

            await assignment.update({ isDeleted: true });
            await skillAssignment.update({ isDeleted: true });
            return respMapper(204, 'Assignment of skill deleted successfully');
        } catch (error) {
            if (error.stack) {
                console.log(error.message);
                console.log(error.stack);
            }
            throw errorResp(400, error.message);
        }
    },
};
