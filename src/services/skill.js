const db = require('../models/index');
const { respMapper, errorResp } = require('../helper/helper');

module.exports = {
    findSkillByTopic: async (topicId) => {
        try {
            let skills = await db.Skill.findAll({
                where: { topicId: topicId, isDeleted: 0 },
                attributes: [
                    'id',
                    'skillName',
                    'description',
                    'standard.standardName',
                    'standard.standardCode',
                ],
                include: [
                    {
                        attributes: [],
                        model: db.Standard,
                        as: 'standard',
                        where: { isDeleted: 0 },
                        require: false,
                    },
                ],
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
            let skill = await db.Skill.findByPk(id, {
                where: { isDeleted: 0 },
                attributes: [
                    'id',
                    'skillName',
                    'description',
                    'standardId',
                    'topicId',
                    'topic.topicName',
                    'topic.gradeId',
                    'topic.grade.gradeName',
                ],
                include: [
                    {
                        attributes: [],
                        model: db.Topic,
                        as: 'topic',
                        where: { isDeleted: 0 },
                        include: [
                            {
                                attributes: [],
                                model: db.Grade,
                                as: 'grade',
                                where: { isDeleted: 0 },
                            },
                        ],
                    },
                ],
                raw: true,
            });
            return respMapper(200, skill);
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
    createSkill: async (skill) => {
        try {
            await db.Skill.create(skill);
            return respMapper(201, 'Successfully created skill ');
        } catch (error) {
            if (error.stack) console.log(error.stack);
            throw errorResp(400, error.message);
        }
    },
    deleteSkill: async (id) => {
        try {
            const assignmentOfSkill = await db.Skill_Assignment.findAll({
                where: { skillId: id, isDeleted: false },
            });

            await db.Skill.update({ isDeleted: true }, { where: { id, isDeleted: false } });
            await db.Skill_Question.update(
                { isDeleted: true },
                { where: { skillId: id, isDeleted: false } }
            );
            await db.Skill_Assignment.update(
                { isDeleted: true },
                { where: { skillId: id, isDeleted: false } }
            );
            await db.Student_Skill.update(
                { isDeleted: true },
                { where: { skillId: id, isDeleted: false } }
            );
            for (let i = 0; i < assignmentOfSkill.length; ++i)
                await db.Student_Assignment.update(
                    { isDeleted: true },
                    {
                        where: {
                            assignmentId: assignmentOfSkill[i].assignmentId,
                            isDeleted: false,
                        },
                    }
                );
            for (let i = 0; i < assignmentOfSkill.length; ++i)
                await db.Assignment.update(
                    { isDeleted: true },
                    {
                        where: {
                            id: assignmentOfSkill[i].assignmentId,
                            isDeleted: false,
                        },
                    }
                );
            return respMapper(200, 'Deleted skill successfully');
        } catch (error) {
            if (error.stack) console.log(error.stack);
            throw errorResp(400, error.message);
        }
    },
};
