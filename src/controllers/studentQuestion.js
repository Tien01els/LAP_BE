const { studentQuestionService } = require('../services/index');

module.exports = {
    getQuestionsOfAssignmentForStudent: async (req, res) => {
        try {
            const assignmentId = req.params.assignmentId;
            const studentId = req.userId;
            const result = await studentQuestionService.findQuestionByAssignmentIdForStudent(
                studentId,
                assignmentId
            );
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            return res.status(errorStatus).send(error.data);
        }
    },
    saveAnswerOfStudent: async (req, res) => {
        try {
            const id = req.params.id;
            const answer = req.body.answer && JSON.stringify(req.body.answer);
            const result = await studentQuestionService.saveAnswerOfStudent(id, answer);
            result.answer = result.answer && JSON.parse(result.answer);
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            return res.status(errorStatus).send(error.data);
        }
    },
};
