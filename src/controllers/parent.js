const {
    parentService,
    studentTopicService,
    skillAssignmentService,
    studentQuestionService,
    studentAssignmentService,
    studentSkillService,
    studentService,
} = require('../services/index');

module.exports = {
    getAchievementsOfStudent: async (req, res) => {
        try {
            const studentId = req.params.studentId;
            let result = await studentService.findAchievementsOfStudent(studentId);
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            console.log(error);
            return res.status(errorStatus).send(error.data);
        }
    },
    getClassOfStudent: async (req, res) => {
        try {
            const studentId = req.params.studentId;
            let result = await studentService.findClassOfStudent(studentId);
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            console.log(error);
            return res.status(errorStatus).send(error.data);
        }
    },
    getPercentSkillsOfStudent: async (req, res) => {
        try {
            const studentId = req.params.studentId;
            let result = await studentTopicService.findAllPercentSkillsOfStudent(studentId);
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            console.log(error);
            return res.status(errorStatus).send(error.data);
        }
    },
    getDeadlineOfStudent: async (req, res) => {
        try {
            const studentId = req.params.studentId;
            const result = await studentAssignmentService.findDeadlineOfStudent(studentId);
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            console.log(error);
            return res.status(errorStatus).send(error.data);
        }
    },
    getAllSkillInTopicOfStudent: async (req, res) => {
        try {
            const studentId = req.params.studentId;
            const topicId = req.params.topicId;
            const result = await studentSkillService.findAllSkillInTopicOfStudent(
                studentId,
                topicId
            );
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            console.log(error);
            return res.status(errorStatus).send(error.data);
        }
    },
    getTopicsOfStudent: async (req, res) => {
        try {
            const studentId = req.params.studentId;
            const classId = req.params.classId;
            let result = await studentTopicService.findTopicsOfStudent(studentId, classId);
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            console.log(error);
            return res.status(errorStatus).send(error.data);
        }
    },
    getAllAssignmentInSkillOfStudent: async (req, res) => {
        try {
            const studentId = req.params.studentId;
            const skillId = req.params.skillId;
            const result = await skillAssignmentService.findAllAssignmentInSkillOfStudent(
                studentId,
                skillId
            );
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            console.log(error);
            return res.status(errorStatus).send(error.data);
        }
    },
    getExamsOfStudent: async (req, res) => {
        try {
            const studentId = req.params.studentId;
            const classId = req.params.classId;
            const result = await studentAssignmentService.findExamsOfStudent(studentId, classId);
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            console.log(error);
            return res.status(errorStatus).send(error.data);
        }
    },
    getResultOfAssignmentOfStudent: async (req, res) => {
        try {
            const studentId = req.params.studentId;
            const assignmentId = req.params.assignmentId;
            const result = await studentQuestionService.findQuestionByAssignmentIdForStudent(
                studentId,
                assignmentId
            );
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            console.log(error);
            return res.status(errorStatus).send(error.data);
        }
    },
    getStudentOfParent: async (req, res) => {
        try {
            const parentId = req.userId;
            const result = await parentService.findStudentOfParent(parentId);
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            console.log(error);
            return res.status(errorStatus).send(error.data);
        }
    },
};
