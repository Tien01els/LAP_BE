const { classTopicService } = require('../services/index');

module.exports = {
    getTopicsByClassId: async (req, res) => {
        const checkParams = req && req.params;

        let teacherId = checkParams && req.params.teacherId;
        let classId = checkParams && req.params.classId;
        let topics = await classTopicService.findTopicsByClassId(
            teacherId,
            classId
        );
        return res.send(topics);
    },
    postClassTopics: async (req, res) => {
        const checkBody = req && req.body;

        let teacherId = checkBody && req.body.teacherId;
        let classId = checkBody && req.body.classId;
        let topics = await classTopicService.findTopicsByClassId(
            teacherId,
            classId
        );
        console.log(topics);
        return res.send(topics);
    },
};
