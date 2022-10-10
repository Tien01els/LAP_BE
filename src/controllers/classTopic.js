const {
    classTopicService,
    studentService,
    studentTopicService,
} = require('../services/index');

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

    postClassTopic: async (req, res) => {
        let classId = req.body.classId;
        let topicId = req.body.topicId;

        let classTopic = {
            averageScore: 0,
            isDeleted: 0,
            classId,
            topicId,
        };
        let classTopicNew = await classTopicService.createClassTopic(
            classTopic
        );

        let students = await studentService.findStudentsbyClassId(classId);
        let studentTopics = new Array();
        for (let i = 0; i < students.length; i++) {
            studentTopics.push({
                status: 0,
                isUnlock: 0,
                dateRequest: '1900-01-01 00:00:00',
                isDeleted: 0,
                studentId: students[i].id,
                topicId,
            });
        }
        await studentTopicService.createListStudentTopic(studentTopics);
        return res.send(classTopicNew);
    },

    deleteClassTopic: async (req, res) => {
        let id = req.params.id;
        let classTopicDeleted = await classTopicService.deleteClassTopic(id);
        let listStudentTopicDeleted = new Array();
        if (
            (typeof classTopicDeleted === 'object' ||
                typeof classTopicDeleted === 'function') &&
            classTopicDeleted !== null
        ) {
            let students = await studentService.findStudentsbyClassId(
                classTopicDeleted.classId
            );
            for (let i = 0; i < students.length; ++i) {
                listStudentTopicDeleted.push(
                    await studentTopicService.deleteStudentTopic(
                        students[i].id,
                        classTopicDeleted.topicId
                    )
                );
            }
        }
        return res.send(listStudentTopicDeleted);
    },
};
