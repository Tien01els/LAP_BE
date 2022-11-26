const {
    studentService,
    assignmentService,
    studentAssignmentService,
} = require('../services/index');

module.exports = {
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
            const result = await studentAssignmentService.updateListStudentAssignment(
                assignmentId,
                listStudentId
            );
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            return res.status(errorStatus).send(error.data);
        }
    },
};
