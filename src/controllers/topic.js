const { topicService } = require('../services/index');

module.exports = {
    getTopic: async (req, res) => {
        try {
            let result = await topicService.findTopic(req.params.id);
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            return res.status(errorStatus).send(error.data);
        }
    },
    getAllTopics: async (req, res) => {
        try {
            let result = await topicService.findAllTopics();
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            return res.status(errorStatus).send(error.data);
        }
    },
    postTopic: async (req, res) => {
        const topic = {
            topicName: req.body.topicName,
            description: req.body.description,
            isDeleted: false,
            teacherId: req.body.teacherId,
            gradeId: req.body.gradeId == '-1' ? null : req.body.gradeId,
            prerequisiteTopicId:
                req.body.prerequisiteTopicId == '-1'
                    ? null
                    : req.body.prerequisiteTopicId,
        };
        let result = await topicService.createTopic(topic);
        return res.send(result);
    },
    getTopicByTeacherIdAndGradeId: async (req, res) => {
        const teacherId = req.params.teacherId;
        const gradeId = req.params.gradeId;
        let result = await topicService.findTopicByTeacherIdAndGradeId(
            teacherId,
            gradeId
        );
        return res.json(result);
    },
    getTopicByTeacherId: async (req, res) => {
        try {
            const result = await topicService.findTopicByTeacherId(
                req.params.teacherId
            );
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            return res.status(errorStatus).send(error.data);
        }
    },
};
