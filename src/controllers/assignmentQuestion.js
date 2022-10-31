const { assignmentQuestionService } = require('../services/index');

module.exports = {
    generateAssignmentQuestion: async (req, res) => {
        try {
            // number question, level, hint: true/false, questionType[], skillId, topicId, gradeId
            const conditions = {
                    assignmentId: req.body.assignmentId,
                    numberQuestion: req.body.numberQuestion,
                    levels: req.body.levels || [],
                    isHint: req.body.isHint,
                    questionTypes: req.body.questionTypes || [],
                    skillIds: req.body.skillIds || [],
                    topicId: req.body.topicId,
                    gradeId: req.body.gradeId,
                    currentQuestions: req.body.currentQuestions || [],
            };

            const result = await assignmentQuestionService.generateAssignmentQuestion(conditions);
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            return res.status(errorStatus).send(error.data);
        }
    },
    postListAssignmentQuestion: async (req, res) => {
        try {
            const assignmentId = req.body.assignmentId;
            const questionIds = req.body.questionIds;
            const result = await assignmentQuestionService.createListAssignmentQuestion(
                assignmentId,
                questionIds
            );
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            return res.status(errorStatus).send(error.data);
        }
    },
    getQuestionOfAssignment: async (req, res) => {
        try {
            const assignmentId = req.params.assignmentId;
            const result = await assignmentQuestionService.findQuestionByAssignmentId(assignmentId);
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            return res.status(errorStatus).send(error.data);
        }
    },
    putQuestionOfAssignment: async (req, res) => {
        try {
            const assignmentId = req.body.assignmentId;
            const questionIds = req.body.questionIds;
            const result = await assignmentQuestionService.updateQuestionByAssignmentId(
                assignmentId,
                questionIds
            );
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            return res.status(errorStatus).send(error.data);
        }
    },
};
