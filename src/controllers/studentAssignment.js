const {
    studentService,
    assignmentService,
    studentAssignmentService,
} = require('../services/index');

module.exports = {
    postStudentAssignment: async (req, res) => {
        const studentId = req.body.studentId;
        const assignmentId = req.body.assignmentId;
        const student = await studentService.findStudent(studentId);
        const assignment = await assignmentService.findAssignment(assignmentId);

        if (student && assignment) {
            let studentAssignment = {
                status: 0,
                dateRequest: '1900-01-01 00:00:00',
                redo: assignment.redo,
                isRedo: 0,
                studentId,
                assignmentId,
                isDeleted: 0,
            };
            let studentAssignmentNew =
                await studentAssignmentService.createStudentAssignment(
                    studentAssignment
                );
            return res.send(studentAssignmentNew);
        }
        return 'This question or student does not exist';
    },
};
