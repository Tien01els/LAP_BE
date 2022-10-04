const db = require('../models/index');

module.exports = {
    findSkill: async (id) => {
        try {
            let skillAssignmentNew = await db.Skill_Assignment.findByPk(id, {
                where: { isDeleted: 0 },
                raw: true,
            });
            return skillAssignmentNew;
        } catch (e) {
            console.log(e);
        }
    },
};
