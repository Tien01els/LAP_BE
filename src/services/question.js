const sequelize = require('sequelize');
const db = require('../models/index');
const { respMapper, errorResp } = require('../helper/helper');

module.exports = {
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
    findQuestionBank: async (
        gradeId = '',
        topicId = '',
        skillId = '',
        level = ''
    ) => {
        try {
            const question = await db.sequelize.query(
                `
                    SELECT q.id, q.content, q.image, q.option, q.level, q.hint, q.score, q.questionTypeId, sq.skillId, s.skillName, t.topicName, g.gradeName
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

            return question;
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
