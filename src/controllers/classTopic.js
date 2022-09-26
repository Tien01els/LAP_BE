const { classTopicService } = require('../services/index');

module.exports = {
    getTopicsByClassId: async (req, res) => {
        let teacherId = req && req.params && req.params.teacherId;
        let classId = req && req.params && req.params.classId;
        let topics = await classTopicService.findTopicsByClassId(
            teacherId,
            classId
        );
        console.log(topics);
        return res.send(topics);
    },
};
