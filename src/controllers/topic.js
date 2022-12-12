const { topicService } = require('../services/index');

module.exports = {
    getTopic: async (req, res) => {
        try {
            let result = await topicService.findTopic(req.params.id);
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            console.log(error);
            return res.status(errorStatus).send(error.data);
        }
    },
    getAllTopics: async (req, res) => {
        try {
            let result = await topicService.findAllTopics();
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            console.log(error);
            return res.status(errorStatus).send(error.data);
        }
    },
    postTopic: async (req, res) => {
        try {
            const topic = {
                topicName: req.body.topicName,
                description: req.body.description,
                isUnlock: req.body.isUnlock,
                isDeleted: false,
                teacherId: req.userId,
                gradeId: req.body.gradeId == '-1' ? null : req.body.gradeId,
                prerequisiteTopicId:
                    req.body.prerequisiteTopicId == '-1' ? null : req.body.prerequisiteTopicId,
                isDeleted: false,
            };
            const result = await topicService.createTopic(topic);
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            console.log(error);
            return res.status(errorStatus).send(error.data);
        }
    },
    getTopicByTeacherIdAndGradeId: async (req, res) => {
        const teacherId = req.userId;
        const gradeId = req.params.gradeId;
        let result = await topicService.findTopicByTeacherIdAndGradeId(teacherId, gradeId);
        return res.json(result);
    },
    getTopicByTeacherId: async (req, res) => {
        try {
            const result = await topicService.findTopicByTeacherId(req.userId);
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            console.log(error);
            return res.status(errorStatus).send(error.data);
        }
    },
    putTopic: async (req, res) => {
        try {
            const teacherId = req.userId;
            const id = req.params.id;
            const topic = {
                topicName: req.body.topicName,
                description: req.body.description,
                topicImg: req.body.topicImg,
                gradeId: req.body.gradeId == '-1' ? null : req.body.gradeId,
                prerequisiteTopicId:
                    req.body.prerequisiteTopicId == '-1' ? null : req.body.prerequisiteTopicId,
            };
            let result = await topicService.updateTopic(id, teacherId, topic);
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            console.log(error);
            return res.status(errorStatus).send(error.data);
        }
    },
    deleteTopic: async (req, res) => {
        try {
            const id = req.params.id;
            let result = await topicService.deleteTopic(id);
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            console.log(error);
            return res.status(errorStatus).send(error.data);
        }
    },
};
