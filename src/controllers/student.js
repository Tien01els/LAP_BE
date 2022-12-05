const { studentService } = require('../services/index');

module.exports = {
    getAchievementsOfStudent: async (req, res) => {
        try {
            let id = req.userId;
            let result = await studentService.findAchievementsOfStudent(id);
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            return res.status(errorStatus).send(error.data);
        }
    },

    getClassOfStudent: async (req, res) => {
        try {
            let id = req.userId;
            let result = await studentService.findClassOfStudent(id);
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            return res.status(errorStatus).send(error.data);
        }
    },

    getStudentsOfClass: async (req, res) => {
        try {
            let classId = req.params.classId;
            let result = await studentService.findStudentsbyClassId(classId);
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            return res.status(errorStatus).send(error.data);
        }
    },

    addStudentToClass: async (req, res) => {
        try {
            let classId = req.params.classId;
            let studentEmail = req.body.studentEmail;
            let result = await studentService.addStudentToClass(classId, studentEmail);
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            return res.status(errorStatus).send(error.data);
        }
    },

    removeStudentFromClass: async (req, res) => {
        try {
            let studentId = req.params.studentId;
            let result = await studentService.removeStudentFromClass(studentId);
            return res.status(200).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            return res.status(errorStatus).send(error.data);
        }
    },
};
