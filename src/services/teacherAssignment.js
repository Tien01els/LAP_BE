const db = require('../models/index');
const { respMapper, errorResp } = require('../helper/helper');

module.exports = {
    findAssignmentOfTeacher: async (teacherId, assignmentId) => {
        try {
            let teacherAssignment = await db.Teacher_Assignment.findOne({
                where: {
                    teacherId,
                    assignmentId,
                    isDeleted: 0,
                },
                attributes: { exclude: ['isDeleted', 'createdAt', 'updatedAt'] },
            });
            return respMapper(200, teacherAssignment);
        } catch (error) {
            if (error.stack) {
                console.log(error.message);
                console.log(error.stack);
            }
            throw errorResp(400, error.message);
        }
    },

    trialTeacherAssignment: async (teacherId, assignmentId) => {
        try {
            const teacher = await db.Teacher.findByPk(teacherId, {
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
            if (!teacher || !assignment)
                return errorResp(409, 'This assignment or teacher does not exist');
            const haveTeacherAssignment = await db.Teacher_Assignment.findOne({
                where: { teacherId, assignmentId, isDeleted: 0 },
                attributes: {
                    exclude: ['isDeleted', 'createdAt', 'updatedAt'],
                },
            });
            if (!haveTeacherAssignment) {
                let teacherAssignment = {
                    dateStart: new Date(),
                    dateEnd: new Date(
                        new Date().getTime() + 60 * parseInt(assignment.doTime) * 1000
                    ),
                    doTime: assignment.doTime * 60,
                    dateComplete: null,
                    teacherId,
                    assignmentId,
                    isDeleted: false,
                };
                await db.Teacher_Assignment.create(teacherAssignment);
                return respMapper(201, 'Assignment of teacher created successfully');
            }
            haveTeacherAssignment.dateStart = new Date();
            haveTeacherAssignment.dateEnd = new Date(
                new Date().getTime() + 60 * parseInt(assignment.doTime) * 1000
            );
            haveTeacherAssignment.doTime = assignment.doTime * 60;
            haveTeacherAssignment.dateComplete = null;
            await haveTeacherAssignment.save();
            await db.Teacher_Question.update(
                {
                    isDeleted: true,
                },
                {
                    where: { teacherId, assignmentId, isDeleted: 0 },
                    attributes: {
                        exclude: ['isDeleted', 'createdAt', 'updatedAt'],
                    },
                    raw: true,
                }
            );
            return respMapper(200, 'Continue trial assignment');
        } catch (error) {
            if (error.stack) {
                console.log(error.message);
                console.log(error.stack);
            }
            throw errorResp(400, error.message);
        }
    },
    submitAssignment: async (teacherId, assignmentId) => {
        try {
            await db.Teacher_Assignment.update(
                {
                    dateComplete: new Date(),
                },
                {
                    where: {
                        teacherId: teacherId,
                        assignmentId: assignmentId,
                        isDeleted: 0,
                    },
                }
            );
            return respMapper(204, 'Teacher successfully submitted assignment');
        } catch (error) {
            if (error.stack) {
                console.log(error.message);
                console.log(error.stack);
            }
            throw errorResp(400, error.message);
        }
    },
    findDoTimeAssignmentOfTeacher: async (teacherId, assignmentId) => {
        try {
            let teacherAssignment = await db.Teacher_Assignment.findOne({
                where: {
                    teacherId,
                    assignmentId,
                    isDeleted: 0,
                },
                attributes: ['doTime', 'dateEnd', 'dateComplete'],
            });
            return respMapper(200, teacherAssignment);
        } catch (error) {
            if (error.stack) {
                console.log(error.message);
                console.log(error.stack);
            }
            throw errorResp(400, error.message);
        }
    },
};
