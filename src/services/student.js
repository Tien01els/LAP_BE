const sequelize = require('sequelize');
const db = require('../models/index');
const { respMapper, errorResp } = require('../helper/helper');

module.exports = {
    findAchievementsOfStudent: async (id) => {
        try {
            const avgScoreOfStudent = await db.Student.findByPk(id, {
                where: { isDeleted: 0 },
                attributes: [
                    'id',
                    [sequelize.fn('AVG', sequelize.col('score')), 'avgScoreOfStudent'],
                ],
                include: [
                    {
                        attributes: [],
                        model: db.Student_Assignment,
                        as: 'studentAssignment',
                        where: { isDeleted: 0 },
                        required: false,
                    },
                ],
                group: ['id'],
                raw: true,
            });
            console.log(avgScoreOfStudent);

            const topicsCompletedOfStudent = await db.Student.findByPk(id, {
                where: { isDeleted: 0 },
                attributes: [
                    'id',
                    [sequelize.fn('count', sequelize.col('topicId')), 'topicsCompletedOfStudent'],
                ],
                include: [
                    {
                        attributes: [],
                        model: db.Student_Topic,
                        as: 'studentTopic',
                        where: { isPass: 1, isDeleted: 0 },
                        required: false,
                    },
                ],
                group: ['id'],
                raw: true,
            });

            console.log(topicsCompletedOfStudent);
            const studentInformation = {
                ...avgScoreOfStudent,
                ...topicsCompletedOfStudent,
            };
            return respMapper(200, studentInformation);
        } catch (error) {
            if (error.stack) console.log(error.stack);
            throw errorResp(400, error.message);
        }
    },
    findClassOfStudent: async (id) => {
        try {
            const classInfo = await db.Class.findOne({
                where: { isDeleted: 0 },
                attributes: {
                    exclude: ['isDeleted', 'createdAt', 'updatedAt'],
                },
                include: [
                    {
                        attributes: [],
                        model: db.Student,
                        as: 'student',
                        where: { id, isDeleted: 0 },
                    },
                ],
            });
            return respMapper(200, classInfo);
        } catch (error) {
            if (error.stack) console.log(error.stack);
            throw errorResp(400, error.message);
        }
    },

    findStudentsbyClassId: async (classId) => {
        try {
            let students = await db.Student.findAll({
                where: { classId, isDeleted: 0 },
                attributes: {
                    exclude: ['isDeleted', 'createdAt', 'updatedAt'],
                },
                raw: true,
            });
            return respMapper(200, students);
        } catch (error) {
            if (error.stack) console.log(error.stack);
            throw errorResp(400, error.message);
        }
    },

    createStudent: async (student) => {
        try {
            await db.Student.create(student);
            return respMapper(201, 'Successfully created student');
        } catch (error) {
            if (error.stack) console.log(error.stack);
            throw errorResp(400, error.message);
        }
    },

    addStudentToClass: async (classId, studentEmail) => {
        try {
            if (!studentEmail)
                return respMapper(422, { text: 'No ok', message: 'Please enter a email' });

            let account = await db.Account.findOne({
                where: { email: studentEmail, roleId: 3, isActive: true, isDeleted: false },
            });

            if (!account) {
                console.log('Not found account of student');
                return respMapper(422, { text: 'No ok', message: 'Account of student not found' });
            }

            const student = await db.Student.findOne({
                where: { accountId: account?.id, isDeleted: 0 },
            });
            console.log(student);
            if (!!student?.classId) {
                return respMapper(409, { text: 'No ok', message: 'Student had class' });
            }
            student.classId = classId;
            await student.save();
            return respMapper(201, {
                text: 'Ok',
                message: 'Add student into class successfully',
            });
        } catch (error) {
            if (error.stack) {
                console.log(error.message);
                console.log(error.stack);
            }
            throw errorResp(400, error.message);
        }
    },

    removeStudentFromClass: async (studentId) => {
        try {
            await db.Student.update({ classId: null }, { where: { id: studentId } });
            return respMapper(204, 'Successfully deleted student');
        } catch (e) {
            console.error('Can not remove student from class');
            console.error(e.message);
            console.error(e.stack);
            throw errorResp(400, error.message);
        }
    },
};
