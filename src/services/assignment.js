const db = require('../models/index');
const { respMapper, errorResp } = require('../helper/helper');

module.exports = {
    findAssignment: async (id) => {
        try {
            const assignment = await db.Assignment.findByPk(id, {
                where: { isDeleted: 0 },
                attributes: {
                    exclude: ['isDeleted', 'createdAt', 'updatedAt'],
                },
                raw: true,
            });
            if (assignment) {
                assignment.questions = await db.Assignment_Question.findAll({
                    where: { assignmentId: assignment.id, isDeleted: 0 },
                    attributes: {
                        exclude: ['isDeleted', 'createdAt', 'updatedAt'],
                    },
                    raw: true,
                });
                return respMapper(200, assignment);
            }
            throw {
                message: 'This assignment does not exist or has been deleted',
            };
        } catch (error) {
            if (error.stack) console.log(error.stack);
            throw errorResp(400, error.message);
        }
    },
    findAssignmentsByTeacherId: async (teacherId) => {
        try {
            let assignments = await db.Assignment.findAll({
                where: { teacherId: teacherId, isDeleted: 0 },
                attributes: {
                    exclude: ['isDeleted', 'createdAt', 'updatedAt'],
                },
                raw: true,
            });
            return assignments;
        } catch (e) {
            console.log(e);
            return e;
        }
    },
    createAssignment: async (assignment) => {
        try {
            let assignmentNew = await db.Assignment.create(assignment);
            return assignmentNew;
        } catch (e) {
            console.log(e);
            return e;
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
            return e;
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
            return e;
        }
    },
};
