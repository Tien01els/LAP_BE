const db = require('../models/index');

module.exports = {
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
                raw: true,
            });
            return questions;
        } catch (e) {
            console.log(e);
        }
    },
    deleteQuestion: async (id) => {
        try {
            const question = await db.Class_Topic.findByPk(id);
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
