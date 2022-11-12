const { skillAssignmentService } = require('../services/index');

module.exports = {
    postSkillAssignment: async (req, res) => {
        try {
            const skillAssignment = {
                skillId: req.body.skillId,
                assignmentId: req.body.assignmentId,
                isDeleted: 0,
            };
            const result = await skillAssignmentService.createSkillAssignment(skillAssignment);
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            return res.status(errorStatus).send(error.data);
        }
    },
    getAssignmentOfSkill: async (req, res) => {
        try {
            const skillId = req.params.skillId;
            const result = await skillAssignmentService.findAssignmentBySkillId(skillId);
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            return res.status(errorStatus).send(error.data);
        }
    },
    deleteAssignmentOfSkill: async (req, res) => {
        try {
            const id = req.params.id;
            const result = await skillAssignmentService.deleteAssignmentBySkillId(id);
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            return res.status(errorStatus).send(error.data);
        }
    },
};
