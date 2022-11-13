const { classTopicService, studentService, studentTopicService } = require('../services/index');

module.exports = {
    getTopicsOfTeacherByClass: async (req, res) => {
        let teacherId = req.userId;
        let classId = req.params.classId;
        let result = await classTopicService.findTopicsOfTeacherByClass(teacherId, classId);
        return res.status(result.statusCode).send(result.data);
    },

    getTopicsOfClassForStudent: async (req, res) => {
        try {
            let classId = req.params.classId;
            let result = await classTopicService.findTopicsOfClassForStudent(classId);
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            return res.status(errorStatus).send(error.data);
        }
    },

    postClassTopic: async (req, res) => {
        try {
            let classId = req.body.classId;
            let topicId = req.body.topicId;
            let classTopic = {
                averageScore: 0,
                isDeleted: 0,
                classId,
                topicId,
            };
            let result = await classTopicService.createClassTopic(classTopic);
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            return res.status(errorStatus).send(error.data);
        }
    },

    deleteClassTopic: async (req, res) => {
        let id = req.params.id;
        let classTopicDeleted = await classTopicService.deleteClassTopic(id);
        let listStudentTopicDeleted = new Array();
        if (
            (typeof classTopicDeleted === 'object' || typeof classTopicDeleted === 'function') &&
            classTopicDeleted !== null
        ) {
            let students = await studentService.findStudentsbyClassId(classTopicDeleted.classId);
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
