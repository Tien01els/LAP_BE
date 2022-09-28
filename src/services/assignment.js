const db = require('../models/index');

module.exports = {
    findAssignmentsByTeacherId: async (teacherId) => {
        try {
            let assignments = await db.Assignment.findAll({
                where: { teacherId: teacherId, isDeleted: 0 },
            });
            return assignments;
        } catch (e) {
            console.log(e);
        }
    },
};
