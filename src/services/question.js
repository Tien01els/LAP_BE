const sequelize = require('sequelize');
const db = require('../models/index');
const { respMapper, errorResp } = require('../helper/helper');

module.exports = {
    findQuestionDetail: async (id) => {
        try {
            const questionDetail = await db.Question.findAll({
                where: { id, isDeleted: 0 },
                attributes: [
                    'id',
                    'content',
                    'image',
                    'option',
                    'level',
                    'hint',
                    'score',
                    'questionTypeId',
                    'teacherId',
                    'skillQuestion.skillId',
                    'skillQuestion.skill.topicId',
                    'skillQuestion.skill.topic.gradeId',
                ],
                include: [
                    {
                        attributes: [],
                        model: db.Skill_Question,
                        as: 'skillQuestion',
                        where: { isDeleted: 0 },
                        right: true,
                        include: [
                            {
                                attributes: [],
                                model: db.Skill,
                                as: 'skill',
                                where: { isDeleted: 0 },
                                right: true,
                                include: [
                                    {
                                        attributes: [],
                                        model: db.Topic,
                                        as: 'topic',
                                        where: { isDeleted: 0 },
                                        right: true,
                                        include: [
                                            {
                                                attributes: [],
                                                model: db.Grade,
                                                as: 'grade',
                                                where: { isDeleted: 0 },
                                                right: true,
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
                raw: true,
            });

            const result = new Array();
            for (let i = 0; i < questionDetail.length; i++) {
                questionDetail[i].option =
                    questionDetail[i].option && JSON.parse(questionDetail[i].option);
                result.push(questionDetail[i]);
            }

            let resultQuestions = new Array();
            for (let i = 0; i < result.length; i++) {
                const indexQuestion = -1;
                for (let j = 0; j < resultQuestions.length; j++)
                    if (result[i].id === resultQuestions[j].id) indexQuestion = j;

                if (indexQuestion === -1) {
                    result[i].skillIds = [result[i].skillId];
                    delete result[i].skillId;
                    resultQuestions.push(result[i]);
                } else {
                    const indexSkill = resultQuestions[indexQuestion].skillIds.indexOf(
                        result[i].skillId
                    );
                    if (indexSkill === -1)
                        resultQuestions[indexQuestion].skillIds.push(result[i].skillId);
                }
            }
            return resultQuestions[0];
        } catch (error) {
            console.log(error);
        }
    },
    findQuestion: async (id) => {
        try {
            let question = await db.Question.findByPk(id, {
                where: { isDeleted: 0 },
                attributes: {
                    exclude: ['isDeleted', 'createdAt', 'updatedAt'],
                },
                raw: true,
            });
            if (!question) return errorResp(409, 'Question not found');
            return respMapper(200, question);
        } catch (error) {
            if (error.stack) console.log(error.stack);
            throw errorResp(400, error.message);
        }
    },
    findQuestionBank: async (gradeId = '', topicId = '', skillId = '', level = '') => {
        try {
            const question = await db.sequelize.query(
                `
                    SELECT q.id, q.content, q.image, q.option, q.level, q.hint, q.score, q.questionTypeId, sq.skillId, s.skillName, s.topicId, t.topicName, t.gradeId, g.gradeName
                    FROM grades AS g 
                    JOIN topics AS t ON ${gradeId && 'g.id = :gradeId AND'} ${
                    topicId && 't.id = :topicId AND'
                } g.id = t.gradeId AND g.isDeleted = 0 AND t.isDeleted = 0
                    JOIN skills AS s ON t.id = s.topicId AND ${
                        skillId && 's.id = :skillId AND'
                    } s.isDeleted = 0 
                    JOIN skill_questions AS sq ON sq.skillId = s.id AND sq.isDeleted = 0 
                    JOIN questions AS q ON q.id = sq.questionId AND ${
                        level && 'level = :level AND'
                    } q.isDeleted = 0 
                    `,
                {
                    replacements: { gradeId, topicId, skillId, level },
                    type: sequelize.QueryTypes.SELECT,
                }
            );
            let resultQuestions = new Array();
            for (let i = 0; i < question.length; i++) {
                const indexQuestion = -1;
                for (let j = 0; j < resultQuestions.length; j++)
                    if (question[i].id === resultQuestions[j].id) indexQuestion = j;

                if (indexQuestion === -1) {
                    question[i].skillIds = [question[i].skillId];
                    delete question[i].skillId;
                    resultQuestions.push(question[i]);
                } else {
                    const indexSkill = resultQuestions[indexQuestion].skillIds.indexOf(
                        question[i].skillId
                    );
                    if (indexSkill === -1)
                        resultQuestions[indexQuestion].skillIds.push(question[i].skillId);
                }
            }
            return resultQuestions;
        } catch (error) {
            console.log(error);
            return e;
        }
    },
    createQuestion: async (question, skillIds) => {
        try {
            let questionNew = await db.Question.create(question);

            const listSkillQuestion = new Array();
            for (let i = 0; i < skillIds.length; ++i) {
                listSkillQuestion.push({
                    questionId: questionNew.id,
                    skillId: skillIds[i],
                    isDeleted: false,
                });
            }
            await db.Skill_Question.bulkCreate(listSkillQuestion);
            return questionNew;
        } catch (error) {
            console.log(error);
            return error;
        }
    },

    findQuestionByAssignmentId: async (assignmentId) => {
        try {
            let questions = await db.Question.findAll({
                where: { assignmentId, isDeleted: 0 },
                attributes: {
                    exclude: ['isDeleted', 'createdAt', 'updatedAt'],
                },
                raw: true,
            });
            return questions;
        } catch (error) {
            console.log(error);
            return e;
        }
    },
    updateQuestion: async (id, teacherId, question, skillIds) => {
        try {
            const currentQuestion = await db.Question.findByPk(id, { where: { isDeleted: 0 } });
            if (!currentQuestion) return respMapper(409, 'Question not found');
            if (currentQuestion.teacherId !== teacherId)
                return errorResp(403, "You don't have permission to edit");

            let questionUpdated = await db.Question.update(
                { ...question },
                {
                    where: { id, isDeleted: 0 },
                }
            );

            if (skillIds?.length > 0 && skillIds[0]) {
                const listSkillQuestion = new Array();
                const listSkillQuestionUpdate = new Array();
                const listSkillQuestionExists = new Array();
                const listSkillQuestionCurrent = await db.Skill_Question.findAll({
                    where: { questionId: id, isDeleted: 0 },
                });

                for (let i = 0; i < listSkillQuestionCurrent.length; i++) {
                    if (skillIds.includes(listSkillQuestionCurrent[i].skillId)) {
                        listSkillQuestionExists.push(skillIds[i]);
                        continue;
                    }
                    await db.Skill_Question.update(
                        { isDeleted: true },
                        { where: { id, isDeleted: false } }
                    );
                }

                for (let i = 0; i < skillIds.length; i++)
                    if (!listSkillQuestionExists.includes(skillIds[i]))
                        listSkillQuestionUpdate.push(skillIds[i]);

                for (let i = 0; i < listSkillQuestionUpdate.length; ++i)
                    listSkillQuestion.push({
                        questionId: questionUpdated.id,
                        skillId: listSkillQuestionUpdate[i],
                        isDeleted: false,
                    });
                await db.Skill_Question.bulkCreate(listSkillQuestion);
            }
            return respMapper(204, 'Question updated successfully');
        } catch (error) {
            if (error.stack) {
                console.log(error.message);
                console.log(error.stack);
            }
            throw errorResp(400, error.message);
        }
    },

    deleteQuestion: async (id) => {
        try {
            await db.Question.update(
                { isDeleted: true },
                {
                    where: { id, isDeleted: true },
                }
            );
            return respMapper(200, 'Question deleted successfully');
        } catch (error) {
            if (error.stack) console.log(error.stack);
            throw errorResp(400, error.message);
        }
    },
};
