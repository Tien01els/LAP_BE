const db = require('../models/index');

module.exports = {
    findAssignmentsByTeacherId: async (teacherId) => {
        try {
            let assignments = await db.Assignment.findAll({
                where: { teacherId: teacherId, isDeleted: 0 },
                raw: true,
            });
            return assignments;
        } catch (e) {
            console.log(e);
        }
    },
    createAssignment: async (assignment) => {
        try {
            let assignmentNew = await db.Assignment.create(assignment);
            return assignmentNew;
        } catch (e) {
            console.log(e);
        }
    },
    findAssignment: async (id) => {
        try {
            let assignments = await db.Assignment.findByPk(id, {
                where: { isDeleted: 0 },
                raw: true,
            });
            return assignments;
        } catch (e) {
            console.log(e);
        }
    },
};
