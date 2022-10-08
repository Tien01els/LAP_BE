const db = require('../models/index');

module.exports = {
    findAssignmentsByTeacherId: async (teacherId) => {
        try {
            let assignments = await db.Assignment.findAll({
                where: { teacherId: teacherId, isDeleted: 0 },
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                raw: true,
            });
            return assignments;
        } catch (e) {
            console.log(e);
        }
    },
    findAssignment: async (id) => {
        try {
            let assignment = await db.Assignment.findByPk(id, {
                where: { isDeleted: 0 },
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                raw: true,
            });
            return assignment;
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
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                raw: true,
            });
            return assignments;
        } catch (e) {
            console.log(e);
        }
    },
    updateAssignment: async (id, assignmentUpdate) => {
        try {
            const assignment = await db.Assignment.findByPk(id, {
                where: { isDeleted: 0 },
            });

            if (assignment) {
                return await assignment.update({ ...assignmentUpdate });
            }
            return 'This question does not exist or has been deleted';
        } catch (e) {
            console.log(e);
        }
    },
    deleteAssignment: async (id) => {
        try {
            const assignment = await db.Assignment.findByPk(id);
            if (assignment) {
                if (assignment.isDeleted) {
                    return 'This assignment has been deleted';
                }
                assignment.isDeleted = true;
                return await assignment.save();
            }
            return 'This assignment does not exist';
        } catch (e) {
            console.log(e);
        }
    },
};
