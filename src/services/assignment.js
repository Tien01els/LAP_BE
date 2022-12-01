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
            if (!assignment)
                throw {
                    message: 'Assignment not found',
                };
            assignment.questions = await db.Assignment_Question.findAll({
                where: { assignmentId: assignment.id, isDeleted: 0 },
                attributes: {
                    exclude: ['isDeleted', 'createdAt', 'updatedAt'],
                },
                raw: true,
            });
            return respMapper(200, assignment);
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
            if (error.stack) console.log(error.stack);
            throw errorResp(400, error.message);
        }
    },
    createAssignment: async (assignment) => {
        try {
            return respMapper(200, {
                message: 'Assignment created successfully',
                result: await db.Assignment.create(assignment),
            });
        } catch (e) {
            if (error.stack) console.log(error.stack);
            throw errorResp(400, error.message);
        }
    },
    updateAssignment: async (id, assignmentUpdate) => {
        try {
            const assignment = await db.Assignment.update(
                { ...assignmentUpdate },
                {
                    where: { id, isDeleted: 0 },
                }
            );
            return respMapper(200, {
                message: 'Assignment updated successfully',
                result: assignment,
            });
        } catch (e) {
            if (error.stack) console.log(error.stack);
            throw errorResp(400, error.message);
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
                await assignment.save();
                await db.Assignment_Question.update(
                    { isDeleted: true },
                    {
                        where: { assignmentId: id, isDeleted: false },
                    }
                );
                return 'Assignment deleted successfully';
            }
            return 'This assignment does not exist';
        } catch (e) {
            if (error.stack) console.log(error.stack);
            throw errorResp(400, error.message);
        }
    },
};
