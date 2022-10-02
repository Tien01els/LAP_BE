const { classTopicService } = require('../services/index');

module.exports = {
    getTopicsByClassId: async (req, res) => {
        let teacherId = req.params.teacherId;
        let classId = req.params.classId;
        let topics = await classTopicService.findTopicsByClassId(
            teacherId,
            classId
        );
        return res.send(topics);
    },
    postClassTopics: async (req, res) => {
        let teacherId = req.body.teacherId;
        let classId = req.body.classId;
        let topics = await classTopicService.findTopicsByClassId(
            teacherId,
            classId
        );
        console.log(topics);
        return res.send(topics);
    },
};
