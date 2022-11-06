const { studentQuestionService } = require('../services/index');

module.exports = {
    postQuestionsOfAssignmentForStudent: async (req, res) => {
        try {
            const assignmentId = req.params.assignmentId;
            const studentId = 1;
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
};
