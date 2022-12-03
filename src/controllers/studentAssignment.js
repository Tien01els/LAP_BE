const {
    studentService,
    assignmentService,
    studentAssignmentService,
} = require('../services/index');

module.exports = {
    getDeadlineOfStudent: async (req, res) => {
        try {
            const studentId = req.userId;
            const result = await studentAssignmentService.findDeadlineOfStudent(studentId);
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            return res.status(errorStatus).send(error.data);
        }
    },
    getAssignmentOfStudent: async (req, res) => {
        try {
            const studentId = req.userId;
            const assignmentId = req.params.assignmentId;
            const result = await studentAssignmentService.findAssignmentOfStudent(
                studentId,
                assignmentId
            );
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            return res.status(errorStatus).send(error.data);
        }
    },
    postStudentAssignment: async (req, res) => {
        try {
            const studentId = req.body.studentId;
            const assignmentId = req.body.assignmentId;
            const result = await studentAssignmentService.createStudentAssignment(
                studentId,
                assignmentId
            );
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            return res.status(errorStatus).send(error.data);
        }
    },
    assignForListStudent: async (req, res) => {
        try {
            const assignmentId = req.params.assignmentId;
            const listStudentId = req.body.listStudentId;
            const dateDue = req.body.dateDue;
            const result = await studentAssignmentService.updateListStudentAssignment(
                assignmentId,
                listStudentId,
                dateDue
            );
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            return res.status(errorStatus).send(error.data);
        }
    },
    updateDateDueOfStudentAssignment: async (req, res) => {
        try {
            const assignmentId = req.params.assignmentId;
            const classId = req.params.classId;
            const dueDay = req.body.dueDay;
            const result = await studentAssignmentService.updateDateDueOfStudentAssignment(
                assignmentId,
                classId,
                dueDay
            );
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            return res.status(errorStatus).send(error.data);
        }
    },
    submitAssignment: async (req, res) => {
        try {
            const assignmentId = req.params.assignmentId;
            const studentId = req.userId;
            const result = await studentAssignmentService.submitAssignment(studentId, assignmentId);
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            return res.status(errorStatus).send(error.data);
        }
    },
};
