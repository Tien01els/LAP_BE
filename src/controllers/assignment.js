const { assignmentService } = require('../services/index');

module.exports = {
    getAssignmentSummary: async (req, res) => {
        try {
            const result = await assignmentService.findAssignmentSummary(req.params.id);
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            return res.status(errorStatus).send(error.data);
        }
    },

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
        try {
            const teacherId = req.userId;
            const assignments = await assignmentService.findAssignmentsByTeacherId(teacherId);
            return res.status(200).send(assignments);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            return res.status(errorStatus).send(error.data);
        }
    },
    postAssignment: async (req, res) => {
        try {
            const assignment = {
                assignmentName: req.body.assignmentName,
                dateDue: req.body.dateDue || new Date(),
                doTime: req.body.doTime || 0,
                passScore: req.body.passScore || 0,
                totalScore: req.body.totalScore || 100,
                redo: req.body.redo || 0,
                typeAssignment: req.body.typeAssignment,
                teacherId: req.userId,
                isDeleted: false,
            };
            const result = await assignmentService.createAssignment(assignment);
            return res.status(201).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            return res.status(errorStatus).send(error.data);
        }
    },
    putAssignment: async (req, res) => {
        const id = req.params.id;
        const assignment = {
            assignmentName: req.body.assignmentName,
            dateDue: req.body.dateDue,
            doTime: req.body.doTime,
            passScore: req.body.passScore,
            totalScore: req.body.totalScore,
            redo: req.body.redo,
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
