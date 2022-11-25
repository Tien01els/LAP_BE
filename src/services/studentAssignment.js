const db = require('../models/index');
const { respMapper, errorResp } = require('../helper/helper');

module.exports = {
    createStudentAssignment: async (studentId, assignmentId) => {
        try {
            const student = await db.Student.findByPk(studentId, {
                where: { isDeleted: 0 },
                attributes: {
                    exclude: ['isDeleted', 'createdAt', 'updatedAt'],
                },
                raw: true,
            });
            const assignment = await db.Assignment.findByPk(assignmentId, {
                where: { isDeleted: 0 },
                attributes: {
                    exclude: ['isDeleted', 'createdAt', 'updatedAt'],
                },
                raw: true,
            });
            if (!student || !assignment)
                return errorResp(409, 'This assignment or student does not exist');

            let studentAssignment = {
                status: 0,
                redo: assignment.redo,
                isRedo: 0,
                studentId,
                assignmentId,
            };
            let studentAssignmentNew = await await db.Student_Assignment.create(studentAssignment);
            return respMapper(201, studentAssignmentNew);
        } catch (error) {
            if (error.stack) {
                console.log(error.message);
                console.log(error.stack);
            }
            throw errorResp(400, error.message);
        }
    },

    createListStudentAssignment: async (listStudentId, assignmentId) => {
        try {
            const assignment = await db.Assignment.findByPk(assignmentId, {
                where: { isDeleted: 0 },
                attributes: {
                    exclude: ['isDeleted', 'createdAt', 'updatedAt'],
                },
                raw: true,
            });
            if (!assignment) return errorResp(409, 'This assignment does not exist');

            let studentAssignments = new Array();
            for (let i = 0; i < listStudentId.length; ++i)
                studentAssignments.push({
                    status: 0,
                    dateRequest: null,
                    redo: assignment.redo,
                    isRedo: 0,
                    studentId: students[i],
                    assignmentId,
                });

            await db.Student_Assignment.bulkCreate(studentAssignments);
            return respMapper(201, 'Assign assignment to student successfully');
        } catch (error) {
            if (error.stack) {
                console.log(error.message);
                console.log(error.stack);
            }
            throw errorResp(400, error.message);
        }
    },
};
