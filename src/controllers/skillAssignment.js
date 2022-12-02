const { skillAssignmentService } = require('../services/index');

module.exports = {
    postSkillAssignment: async (req, res) => {
        try {
            const skillAssignment = {
                skillId: req.body.skillId,
                assignmentId: req.body.assignmentId,
                isDeleted: false,
            };
            const result = await skillAssignmentService.createSkillAssignment(skillAssignment);
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            return res.status(errorStatus).send(error.data);
        }
    },
    getAllAssignmentInSkill: async (req, res) => {
        try {
            const skillId = req.params.skillId;
            const result = await skillAssignmentService.findAllAssignmentBySkillId(skillId);
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            return res.status(errorStatus).send(error.data);
        }
    },
    getAllAssignmentInSkillOfStudent: async (req, res) => {
        try {
            const studentId = req.userId;
            const skillId = req.params.skillId;
            const result = await skillAssignmentService.findAllAssignmentInSkillOfStudent(
                studentId,
                skillId
            );
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            return res.status(errorStatus).send(error.data);
        }
    },
    deleteAssignmentInSkill: async (req, res) => {
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
