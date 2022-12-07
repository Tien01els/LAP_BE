const db = require('../models/index');
const { Op } = require('sequelize');
const sequelize = require('sequelize');
const moment = require('moment');

const { respMapper, errorResp } = require('../helper/helper');

module.exports = {
    findExamsOfStudent: async (studentId, classId) => {
        try {
            let studentAssignment = await db.Student_Assignment.findAll({
                where: {
                    studentId,
                    isDeleted: 0,
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
                        include: [
                            {
                                attributes: { exclude: ['isDeleted', 'createdAt', 'updatedAt'] },
                                model: db.Class_Assignment,
                                as: 'classAssignment',
                                where: { classId, isDeleted: 0 },
                            },
                        ],
                    },
                ],
            });
            return respMapper(200, studentAssignment);
        } catch (error) {
            if (error.stack) {
                console.log(error.message);
                console.log(error.stack);
            }
            throw errorResp(400, error.message);
        }
    },
    findDeadlineOfStudent: async (studentId) => {
        try {
            let studentAssignment = await db.Student_Assignment.findAll({
                where: {
                    studentId,
                    isDeleted: 0,
                    // dateDue: {
                    //     [Op.gte]: new Date(),
                    // },
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
            return respMapper(200, studentAssignment);
        } catch (error) {
            if (error.stack) {
                console.log(error.message);
                console.log(error.stack);
            }
            throw errorResp(400, error.message);
        }
    },
    findAssignmentOfStudent: async (studentId, assignmentId) => {
        try {
            let studentAssignment = await db.Student_Assignment.findOne({
                where: {
                    studentId,
                    assignmentId,
                    isDeleted: 0,
                },
                attributes: { exclude: ['isDeleted', 'createdAt', 'updatedAt'] },
            });
            return respMapper(200, studentAssignment);
        } catch (error) {
            if (error.stack) {
                console.log(error.message);
                console.log(error.stack);
            }
            throw errorResp(400, error.message);
        }
    },
    findDoTimeAssignmentOfStudent: async (studentId, assignmentId) => {
        try {
            let studentAssignment = await db.Student_Assignment.findOne({
                where: {
                    studentId,
                    assignmentId,
                    isDeleted: 0,
                },
                attributes: ['doTime', 'dateEnd', 'dateComplete'],
            });
            return respMapper(200, studentAssignment);
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
                attributes: { exclude: ['isDeleted', 'createdAt', 'updatedAt'] },
            });
            if (!classAssignment) return errorResp(409, 'This assignment of class not found');
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
            return respMapper(201, 'Successfully updated due date assignment of student');
        } catch (error) {
            if (error.stack) {
                console.log(error.message);
                console.log(error.stack);
            }
            throw errorResp(400, error.message);
        }
    },

    submitAssignment: async (studentId, assignmentId) => {
        try {
            const resultOfStudent = await db.Student_Question.findAll({
                where: { studentId: studentId, isCorrect: 1, isDeleted: 0 },
                attributes: [
                    'assignmentId',
                    [sequelize.fn('sum', sequelize.col('score')), 'totalScoreOfStudent'],
                ],
                include: [
                    {
                        attributes: [],
                        model: db.Question,
                        as: 'question',
                        where: { isDeleted: 0 },
                        required: false,
                    },
                ],
                group: ['assignmentId'],
                raw: true,
            });
            const totalScoreOfStudent =
                (resultOfStudent?.length && resultOfStudent[0]?.totalScoreOfStudent) || 0;
            await db.Student_Assignment.update(
                {
                    score: totalScoreOfStudent,
                    status: 3,
                    dateComplete: new Date(),
                },
                {
                    where: {
                        studentId: studentId,
                        assignmentId: assignmentId,
                        isDeleted: 0,
                    },
                }
            );
            return respMapper(201, 'Student successfully submitted assignment');
        } catch (error) {
            if (error.stack) {
                console.log(error.message);
                console.log(error.stack);
            }
            throw errorResp(400, error.message);
        }
    },

    startAssignment: async (studentId, assignmentId) => {
        try {
            const assignment = await db.Assignment.findByPk(assignmentId, {
                where: { isDeleted: 0 },
            });

            let dateEnd = new Date(new Date().getTime() + 60 * parseInt(assignment.doTime) * 1000);
            if (assignment.typeAssignment === 'Class') {
                if (moment(dateEnd).diff(moment()) > moment(assignment.dateDue).diff(moment()))
                    dateEnd = assignment.dateDue;
            }

            await db.Student_Assignment.update(
                {
                    status: 1,
                    dateStart: new Date(),
                    dateEnd: dateEnd,
                    doTime: assignment.doTime * 60,
                    score: 0,
                    dateComplete: null,
                },
                {
                    where: {
                        studentId: studentId,
                        assignmentId: assignmentId,
                        isDeleted: 0,
                    },
                }
            );
            await db.Student_Question.update(
                {
                    isDeleted: true,
                },
                {
                    where: { studentId, assignmentId, isDeleted: 0 },
                    attributes: {
                        exclude: ['isDeleted', 'createdAt', 'updatedAt'],
                    },
                    raw: true,
                }
            );
            return respMapper(204, 'Student successfully started');
        } catch (error) {
            if (error.stack) {
                console.log(error.message);
                console.log(error.stack);
            }
            throw errorResp(400, error.message);
        }
    },
};
