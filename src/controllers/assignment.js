const { assignmentService } = require('../services/index');

module.exports = {
    //load assignments
    getAssignmentsOfTeacher: async (req, res) => {
        let teacherId = req.params.teacherId;
        let assignments = await assignmentService.findAssignmentsByTeacherId(
            teacherId
        );
        return res.send(assignments);
    },
    postAssignmentOfTeacher: async (req, res) => {
        let teacherId = req.params.teacherId;
        let assignments = await assignmentService.createAssignmentByTeacherId(
            teacherId
        );
        return res.send(assignments);
    },
};
