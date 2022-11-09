const { assignmentService } = require('../services/index');

module.exports = {
    getAssignment: async (req, res) => {
        try {
            const result = await assignmentService.findAssignment(req.params.id);
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            return res.status(errorStatus).send(error.data);
        }
    },
    getAssignmentsOfTeacher: async (req, res) => {
        const teacherId = req.userId;
        const assignments = await assignmentService.findAssignmentsByTeacherId(teacherId);
        return res.send(assignments);
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
        const assignmentNew = await assignmentService.createAssignment(assignment);
        if (!assignmentNew) return res.json({ error: 'Could not create assignment' });
        return res.json(assignmentNew);
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
        const assignmentUpdated = await assignmentService.updateAssignment(id, assignment);
        return res.send(assignmentUpdated);
    },
    deleteAssignment: async (req, res) => {
        const id = req.params.id;
        const assignmentDeleted = await assignmentService.deleteAssignment(id);
        return res.send(assignmentDeleted);
    },
};
