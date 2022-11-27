const { classAssignmentService } = require('../services/index');

module.exports = {
    getAssignmentOfClass: async (req, res) => {
        try {
            const { classId } = req.params;
            let result = await classAssignmentService.findAssignemtnOfClass(classId);
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            return res.status(errorStatus).send(error.data);
        }
    },
    postClassAssignment: async (req, res) => {
        try {
            const { classId, assignmentId, dateOpen, dateDue } = req.body;
            let result = await classAssignmentService.createClassAssignment(
                classId,
                assignmentId,
                dateOpen,
                dateDue
            );
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            return res.status(errorStatus).send(error.data);
        }
    },
    updateDueDateOfClassAssignment: async (req, res) => {
        try {
            const { classId, assignmentId } = req.params;
            const { dueDay } = req.body;
            let result = await classAssignmentService.updateDueDateOfClassAssignment(
                classId,
                assignmentId,
                dueDay
            );
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            return res.status(errorStatus).send(error.data);
        }
    },
    deleteClassAssignment: async (req, res) => {
        try {
            let id = req.params.id;
            let result = await classAssignmentService.deleteClassAssignment(id);
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            return res.status(errorStatus).send(error.data);
        }
    },
};
