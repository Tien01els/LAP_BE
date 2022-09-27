const { topicService } = require('../services/index');

<<<<<<< Updated upstream
module.exports = {};
=======
module.exports = {
    postTopic: async (req, res) => {
        const checkBody = req && req.body;
        const topic = {
            topicName: checkBody && req.body.topicName,
            description: checkBody && req.body.description,
            isDeleted: false,
            teacherId: checkBody && req.body.teacherId,
            gradeId: checkBody && req.body.gradeId,
            prerequisiteTopicId: checkBody && req.body.prerequisiteTopicId,
        };
        let result = await topicService.createTopic(topic);
        return res.send(result);
    },
    getTopicByTeacherIdAndGradeId: async (req, res) => {
        const teacherId = req && req.params && req.params.teacherId;
        const gradeId = req && req.params && req.params.gradeId;
        let result = await topicService.getTopicByTeacherIdAndGradeId(
            teacherId,
            gradeId
        );
        return res.send(result);
    },
};
>>>>>>> Stashed changes
