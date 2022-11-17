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
            const isUnlock = req.body.isUnlock || 0;
            let result = await classTopicService.createClassTopic(classTopic, isUnlock);
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            return res.status(errorStatus).send(error.data);
        }
    },

    deleteClassTopic: async (req, res) => {
        try {
            let id = req.params.id;
            let result = await classTopicService.deleteClassTopic(id);
            let classTopicDeleted = result.data;
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
                    const resultDeleted = await studentTopicService.deleteStudentTopic(
                        students[i].id,
                        classTopicDeleted.topicId
                    );
                    listStudentTopicDeleted.push(resultDeleted.data);
                }
            }
            return res.status(204).send(listStudentTopicDeleted);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            return res.status(errorStatus).send(error.data);
        }
    },
};
