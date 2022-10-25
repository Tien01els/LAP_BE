const { skillAssignmentService } = require('../services/index');

module.exports = {
    postSkillAssignment: async (req, res) => {
        try {
            const skillAssignment = {
                skillId: req.body.skillId,
                assignmentId: req.body.assignmentId,
                isDeleted: 0,
            };
            const result = await skillAssignmentService.createSkillAssignment(
                skillAssignment
            );
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            return res.status(errorStatus).send(error.data);
        }
    },
};
