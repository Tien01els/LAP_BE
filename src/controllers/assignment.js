const { assignmentService, questionService } = require('../services/index');

module.exports = {
    //load assignments
    getAssignmentsOfTeacher: async (req, res) => {
        const teacherId = req.params.teacherId;
        const assignments = await assignmentService.findAssignmentsByTeacherId(
            teacherId
        );
        return res.send(assignments);
    },
    getAssignmentWithQuestion: async (req, res) => {
        const id = req.params.id;
        const assignment = await assignmentService.findAssignment(id);
        assignment.questions = await questionService.findQuestionByAssignmentId(
            id
        );
        console.log(assignment);
        return res.send(assignment);
    },
    postAssignment: async (req, res) => {
        const assignment = {
            assignmentName: req.body.assignmentName,
            dateDue: req.body.dateDue || new Date(),
            time: req.body.time || 0,
            totalScore: req.body.totalScore || 100,
            redo: req.body.redo || 0,
            teacherId: req.body.teacherId,
            isDeleted: 0,
        };
        const assignmentNew = await assignmentService.createAssignment(
            assignment
        );
        return res.send(assignmentNew);
    },
    putAssignment: async (req, res) => {
        const id = req.params.id;
        const assignment = {
            assignmentName: req.body.assignmentName,
            dateDue: req.body.dateDue,
            time: req.body.time,
            totalScore: req.body.totalScore,
            redo: req.body.redo,
            teacherId: req.body.teacherId,
        };
        const assignmentUpdated = await assignmentService.updateAssignment(
            id,
            assignment
        );
        return res.send(assignmentUpdated);
    },
    deleteAssignment: async (req, res) => {
        const id = req.params.id;
        const assignmentDeleted = await assignmentService.deleteAssignment(id);
        return res.send(assignmentDeleted);
    },
};
