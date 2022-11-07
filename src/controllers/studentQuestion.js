const { studentQuestionService } = require('../services/index');

module.exports = {
    postQuestionsOfAssignmentForStudent: async (req, res) => {
        try {
            const assignmentId = req.params.assignmentId;
            const studentId = req.userId;
            const result = await studentQuestionService.createQuestionByAssignmentIdForStudent(
                assignmentId,
                studentId
            );
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            return res.status(errorStatus).send(error.data);
        }
    },

    getQuestionsOfAssignmentForStudent: async (req, res) => {
        try {
            const assignmentId = req.params.assignmentId;
            const studentId = req.userId;
            const result = await studentQuestionService.findQuestionByAssignmentIdForStudent(
                assignmentId,
                studentId
            );
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            return res.status(errorStatus).send(error.data);
        }
    },
};
