const { topicService } = require('../services/index');

module.exports = {
    postTopic: async (req, res) => {
        const topic = {
            topicName: req.body.topicName,
            description: req.body.description,
            isDeleted: false,
            teacherId: req.body.teacherId,
            gradeId: req.body.gradeId,
            prerequisiteTopicId: req.body.prerequisiteTopicId,
        };
        let result = await topicService.createTopic(topic);
        return res.send(result);
    },
    getTopicByTeacherIdAndGradeId: async (req, res) => {
        const teacherId = req.params.teacherId;
        const gradeId = req.params.gradeId;
        let result = await topicService.getTopicByTeacherIdAndGradeId(
            teacherId,
            gradeId
        );
        return res.send(result);
    },
};
