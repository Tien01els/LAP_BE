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

    updateListStudentAssignment: async (assignmentId, listStudentId) => {
        try {
            const assignment = await db.Assignment.findByPk(assignmentId, {
                where: { isDeleted: 0 },
                attributes: {
                    exclude: ['isDeleted', 'createdAt', 'updatedAt'],
                },
                raw: true,
            });
            if (!assignment) return errorResp(409, 'This assignment does not exist');

            let currentStudentsOfAssignment = await db.Student_Assignment.findAll({
                where: { assignmentId, isDeleted: false },
                attributes: {
                    exclude: ['isDeleted', 'createdAt', 'updatedAt'],
                },
            });

            let currentListStudentIdOfAssignment = [];
            currentListStudentIdOfAssignment = currentStudentsOfAssignment.map(
                (student) => student.studentId
            );

            let existListStudentId = [];
            let updateListStudentId = [];
            for (let i = 0; i < currentListStudentIdOfAssignment.length; i++) {
                if (listStudentId.includes(currentListStudentIdOfAssignment[i])) {
                    existListStudentId.push(currentListStudentIdOfAssignment[i]);
                    await db.Student_Assignment.update(
                        { isDeleted: false },
                        {
                            where: {
                                assignmentId,
                                studentId: currentListStudentIdOfAssignment[i],
                                isDeleted: false,
                            },
                        }
                    );
                    continue;
                }
                await db.Student_Assignment.update(
                    { isDeleted: true },
                    {
                        where: {
                            assignmentId,
                            studentId: currentListStudentIdOfAssignment[i],
                            isDeleted: false,
                        },
                    }
                );
            }
            for (let i = 0; i < listStudentId.length; i++)
                if (!existListStudentId.includes(listStudentId[i]))
                    updateListStudentId.push(listStudentId[i]);

            const listStudentAssignment = new Array();
            for (let i = 0; i < updateListStudentId.length; ++i) {
                listStudentAssignment.push({
                    studentId: updateListStudentId[i],
                    assignmentId: assignmentId,
                    status: 0,
                    redo: assignment.redo,
                    isRedo: 0,
                });
            }
            await db.Student_Assignment.bulkCreate(listStudentAssignment);
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
