const { assignmentQuestionService } = require('../services/index');

module.exports = {
    postListAssignmentQuestion: async (req, res) => {
        try {
            const listAssignmentQuestion = req.body;
            for (let i = 0; i < listAssignmentQuestion.length; ++i) {
                listAssignmentQuestion[i].isDeleted = false;
            }
            const result =
                await assignmentQuestionService.createListAssignmentQuestion(
                    listAssignmentQuestion
                );
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            return res.status(errorStatus).send(error.data);
        }
    },
};
