const { studentTopicService } = require('../services/index');

module.exports = {
    postStudentTopic: async (req, res) => {
        let studentId = req.body.studentId;
        let topicId = req.body.topicId;

        let studentTopic = {
            status: 0,
            isUnlock: 0,
            dateRequest: '1900-01-01 00:00:00',
            isDeleted: 0,
            studentId,
            topicId,
        };

        let studentTopicNew = await studentTopicService.createStudentTopic(
            studentTopic
        );

        return res.send(studentTopicNew);
    },
};
