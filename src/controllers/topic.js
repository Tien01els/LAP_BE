const { topicService } = require('../services/index');

<<<<<<< HEAD
module.exports = {
    postTopic: async (req, res) => {
        const topic = {
            topicName: req.body.topicName,
            description: req.body.description,
            isDeleted: false,
            teacherId: req.body.teacherId,
            gradeId: req.body.gradeId,
            prerequisiteTopicId: req.body.prerequisiteTopicId,
=======
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
>>>>>>> 770d873c030ecb35de5ae6180c926406eb82ba1d
        };
        let result = await topicService.createTopic(topic);
        return res.send(result);
    },
    getTopicByTeacherIdAndGradeId: async (req, res) => {
<<<<<<< HEAD
        const teacherId = req.params.teacherId;
        const gradeId = req.params.gradeId;
=======
        const teacherId = req && req.params && req.params.teacherId;
        const gradeId = req && req.params && req.params.gradeId;
>>>>>>> 770d873c030ecb35de5ae6180c926406eb82ba1d
        let result = await topicService.getTopicByTeacherIdAndGradeId(
            teacherId,
            gradeId
        );
        return res.send(result);
    },
};
<<<<<<< HEAD
=======
>>>>>>> Stashed changes
>>>>>>> 770d873c030ecb35de5ae6180c926406eb82ba1d
