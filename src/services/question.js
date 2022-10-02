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
            });
            return questions;
        } catch (e) {
            console.log(e);
        }
    },
};
