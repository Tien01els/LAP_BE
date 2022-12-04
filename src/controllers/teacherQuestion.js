const { teacherQuestionService } = require('../services/index');

module.exports = {
    getQuestionsOfAssignmentForTeacher: async (req, res) => {
        try {
            const assignmentId = req.params.assignmentId;
            const teacherId = req.userId;
            const result = await teacherQuestionService.findQuestionByAssignmentIdForTeacher(
                teacherId,
                assignmentId
            );
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            return res.status(errorStatus).send(error.data);
        }
    },
    saveAnswerOfTeacher: async (req, res) => {
        try {
            const id = req.params.id;
            const answer = req.body.answer;
            const result = await teacherQuestionService.saveAnswerOfTeacher(id, answer);
            result.answer = result.answer && JSON.parse(result.answer);
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            return res.status(errorStatus).send(error.data);
        }
    },
};
