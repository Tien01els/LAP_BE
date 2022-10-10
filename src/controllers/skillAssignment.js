const { skillAssignmentService } = require('../services/index');

module.exports = {
    postSkillAssignment: async (req, res) => {
        let skillAssignment = {
            skillId: req.body.skillId,
            assignmentId: req.body.assignmentId,
            isDeleted: 0,
        };
        let skillAssignmentNew = await skillAssignmentService.createSkillAssignment(
            skillAssignment
        );
        return res.send(skillAssignmentNew);
    },
};
