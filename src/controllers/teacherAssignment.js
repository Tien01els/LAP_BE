const { teacherAssignmentService } = require('../services/index');

module.exports = {
    getAssignmentOfTeacher: async (req, res) => {
        try {
            const teacherId = req.userId;
            const assignmentId = req.params.assignmentId;
            const result = await teacherAssignmentService.findAssignmentOfTeacher(
                teacherId,
                assignmentId
            );
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            console.log(error);
            return res.status(errorStatus).send(error.data);
        }
    },

    trialTeacherAssignment: async (req, res) => {
        try {
            const assignmentId = req.params.assignmentId;
            const teacherId = req.userId;
            const result = await teacherAssignmentService.trialTeacherAssignment(
                teacherId,
                assignmentId
            );
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            console.log(error);
            return res.status(errorStatus).send(error.data);
        }
    },

    getDoTimeAssignmentOfTeacher: async (req, res) => {
        try {
            const teacherId = req.userId;
            const assignmentId = req.params.assignmentId;
            const result = await teacherAssignmentService.findDoTimeAssignmentOfTeacher(
                teacherId,
                assignmentId
            );
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            console.log(error);
            const errorStatus = error.statusCode || 500;
            console.log(error);
            return res.status(errorStatus).send(error.data);
        }
    },

    submitAssignment: async (req, res) => {
        try {
            const assignmentId = req.params.assignmentId;
            const teacherId = req.userId;
            const result = await teacherAssignmentService.submitAssignment(teacherId, assignmentId);
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            console.log(error);
            return res.status(errorStatus).send(error.data);
        }
    },
};
