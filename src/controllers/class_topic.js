const { classTopicService } = require('../services/index');

module.exports = {
    getTopicsByClassId: async (req, res) => {
        let classId = req && req.params && req.params.classId;
        let topics = await classTopicService.findTopicsByClassId(classId);
        console.log(topics);
        return res.send(topics);
    },
};
