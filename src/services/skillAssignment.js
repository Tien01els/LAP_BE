const db = require('../models/index');

module.exports = {
    createSkillAssignment: async (skillAssignment) => {
        try {
            let skillAssignmentNew = await db.Skill_Assignment.create(
                skillAssignment
            );
            return skillAssignmentNew;
        } catch (e) {
            console.log(e);
        }
    },
};
