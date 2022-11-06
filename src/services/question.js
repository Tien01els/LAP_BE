const sequelize = require('sequelize');
const db = require('../models/index');
const { respMapper, errorResp } = require('../helper/helper');

module.exports = {
    findQuestionDetail: async (id) => {
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
                'skill_questions.skillId',
                'skill_questions.skill.topicId',
                'skill_questions.skill.topic.gradeId',
            ],
            include: [
                {
                    attributes: [],
                    model: db.Skill_Question,
                    where: { isDeleted: 0 },
                    right: true,
                    include: [
                        {
                            attributes: [],
                            model: db.Skill,
                            where: { isDeleted: 0 },
                            right: true,
                            include: [
                                {
                                    attributes: [],
                                    model: db.Topic,
                                    where: { isDeleted: 0 },
                                    right: true,
                                    include: [
                                        {
                                            attributes: [],
                                            model: db.Grade,
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
        } catch (e) {
            console.log(e);
            return e;
        }
    },
    createQuestion: async (question) => {
        try {
            let questionNew = await db.Question.create(question);
            return questionNew;
        } catch (e) {
            console.log(e);
            return e;
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
        } catch (e) {
            console.log(e);
            return e;
        }
    },
    updateQuestion: async (id, questionUpdate) => {
        try {
            const question = await db.Question.findByPk(id, {
                where: { isDeleted: 0 },
                attributes: {
                    exclude: ['createdAt', 'updatedAt'],
                },
            });

            if (question) {
                return await question.update({ ...questionUpdate });
            }
            return question;
        } catch (e) {
            console.log(e);
            return e;
        }
    },
    deleteQuestion: async (id) => {
        try {
            const question = await db.Question.findByPk(id);
            if (question) {
                if (question.isDeleted) {
                    return 'This question has been deleted';
                }
                question.isDeleted = true;
                return await question.save();
            }
            return 'This question does not exist';
        } catch (e) {
            console.log(e);
            return e;
        }
    },
};
