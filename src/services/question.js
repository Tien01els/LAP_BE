const db = require('../models/index');

module.exports = {
    findQuestion: async (id) => {
        try {
            let question = await db.Question.findByPk(id, {
                where: { isDeleted: 0 },
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                raw: true,
            });
            return question;
        } catch (e) {
            console.log(e);
        }
    },
    createQuestion: async (question) => {
        try {
            let questionNew = await db.Question.create(question);
            return questionNew;
        } catch (e) {
            console.log(e);
        }
    },
    findQuestionByAssignmentId: async (assignmentId) => {
        try {
            let questions = await db.Question.findAll({
                where: { assignmentId, isDeleted: 0 },
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                raw: true,
            });
            return questions;
        } catch (e) {
            console.log(e);
        }
    },
    updateQuestion: async (id, questionUpdate) => {
        try {
            const question = await db.Question.findByPk(id, {
                where: { isDeleted: 0 },
            });

            if (question) {
                return await question.update({ ...questionUpdate });
            }
            return 'This question does not exist or has been deleted';
        } catch (e) {
            console.log(e);
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
        }
    },
};
