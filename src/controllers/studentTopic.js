const { studentTopicService } = require('../services/index');

module.exports = {
    postStudentTopic: async (req, res) => {
        try {
            let studentId = req.body.studentId;
            let topicId = req.body.topicId;
            let isUnlock = req.body.isUnlock;
            let studentTopic = {
                status: 0,
                isUnlock: isUnlock,
                isDeleted: 0,
                studentId,
                topicId,
            };
            let result = await studentTopicService.createStudentTopic(studentTopic);
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            return res.status(errorStatus).send(error.data);
        }
    },
    updateTopicsOfStudent: async (req, res) => {
        try {
            const studentId = req.userId;
            const topicIds = req.params.classId;
            let result = await studentTopicService.updateTopicsOfStudent(studentId, topicIds);
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            return res.status(errorStatus).send(error.data);
        }
    },
};
