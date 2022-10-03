const db = require('../models/index');

module.exports = {
    createClassAssignment: async (classAssignment) => {
        try {
            let classAssignmentNew = await db.Class_Assignment.create(
                classAssignment
            );
            return classAssignmentNew;
        } catch (e) {
            console.log(e);
        }
    },
    findClassAssignment: async (classId, assignmentId) => {
        try {
            let classAssignment = await db.Class_Assignment.findOne({
                where: { classId, assignmentId, isDeleted: 0 },
                raw: true,
            });
            return classAssignment;
        } catch (e) {
            console.log(e);
        }
    },
};
