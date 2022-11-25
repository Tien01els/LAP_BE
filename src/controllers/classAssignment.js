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
            const { classId, assignmentId, dateOpen } = req.body;
            let result = await classAssignmentService.createClassAssignment(
                classId,
                assignmentId,
                dateOpen
            );
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            return res.status(errorStatus).send(error.data);
        }
    },
    deleteClassAssignment: async (req, res) => {
        let id = req.params.id;
        let classAssignmentDeleted = await classAssignmentService.deleteClassAssignment(id);
        return res.send(classAssignmentDeleted);
    },
};
