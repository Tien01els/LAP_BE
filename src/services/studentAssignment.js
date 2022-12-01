const db = require('../models/index');
const { Op } = require('sequelize');
const { respMapper, errorResp } = require('../helper/helper');

module.exports = {
    findDeadlineOfStudent: async (studentId) => {
        try {
            let studentAssignment = await db.Student_Assignment.findAll({
                where: {
                    studentId,
                    isDeleted: 0,
                    dateDue: {
                        [Op.gte]: new Date(),
                    },
                },
                attributes: {
                    exclude: ['isDeleted', 'createdAt', 'updatedAt'],
                },
                include: [
                    {
                        attributes: { exclude: ['isDeleted', 'createdAt', 'updatedAt'] },
                        model: db.Assignment,
                        as: 'assignment',
                        where: { isDeleted: 0 },
                    },
                ],
            });
            return respMapper(201, studentAssignment);
        } catch (error) {
            if (error.stack) {
                console.log(error.message);
                console.log(error.stack);
            }
            throw errorResp(400, error.message);
        }
    },
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
                isDeleted: false,
            };
            let studentAssignmentNew = await db.Student_Assignment.create(studentAssignment);
            return respMapper(201, studentAssignmentNew);
        } catch (error) {
            if (error.stack) {
                console.log(error.message);
                console.log(error.stack);
            }
            throw errorResp(400, error.message);
        }
    },

    updateListStudentAssignment: async (assignmentId, listStudentId, dateDue) => {
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
                    dateDue,
                    isRedo: 0,
                    isDeleted: false,
                });
            }
            listStudentAssignment.length &&
                (await db.Student_Assignment.bulkCreate(listStudentAssignment));
            return respMapper(201, 'successfully assign assignment to student');
        } catch (error) {
            if (error.stack) {
                console.log(error.message);
                console.log(error.stack);
            }
            throw errorResp(400, error.message);
        }
    },

    updateDateDueOfStudentAssignment: async (assignmentId, classId, dueDay) => {
        try {
            const classAssignment = await db.Class_Assignment.findOne({
                where: { classId, assignmentId, isDeleted: 0 },
            });
            if (!classAssignment) return errorResp(409, 'This assignment of class does not exist');
            const listStudent = await db.Student.findAll({
                where: { classId, isDeleted: 0 },
                attributes: ['id'],
            });
            if (dueDay)
                for (let i = 0; i < listStudent.length; ++i) {
                    await db.Student_Assignment.update(
                        {
                            dateDue: new Date(
                                new Date(classAssignment.dateOpen).getTime() +
                                    24 * 60 * 60 * parseInt(dueDay) * 1000
                            ),
                        },
                        {
                            where: { studentId: listStudent[i].id, assignmentId, isDeleted: 0 },
                        }
                    );
                }
            return respMapper(201, 'successfully updated due date assignment of student');
        } catch (error) {
            if (error.stack) {
                console.log(error.message);
                console.log(error.stack);
            }
            throw errorResp(400, error.message);
        }
    },
};
