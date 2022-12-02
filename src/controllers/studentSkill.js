const { studentSkillService } = require('../services/index');

module.exports = {
    getAllSkillInTopicOfStudent: async (req, res) => {
        try {
            const studentId = req.userId;
            const topicId = req.params.topicId;
            const result = await studentSkillService.findAllSkillInTopicOfStudent(
                studentId,
                topicId
            );
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            return res.status(errorStatus).send(error.data);
        }
    },
};
