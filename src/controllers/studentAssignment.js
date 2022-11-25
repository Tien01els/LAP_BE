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
    postListStudentAssignment: async (req, res) => {},
};
