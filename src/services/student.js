const db = require('../models/index');

module.exports = {
    findStudent: async (id) => {
        try {
            let student = await db.Student.findByPk(id, {
                where: { isDeleted: 0 },
                attributes: {
                    exclude: ['isDeleted', 'createdAt', 'updatedAt'],
                },
                raw: true,
            });
            return student;
        } catch (e) {
            console.log(e);
            return e;
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
            return students;
        } catch (e) {
            console.log(e);
            return e;
        }
    },

    createStudent: async (student) => {
        try {
            let studentNew = await db.Student.create(student);
            return studentNew;
        } catch (e) {
            console.log(e);
            return e;
        }
    },

    addStudentToClass: async (classId, studentEmail) => {
        try {
            if (!studentEmail) {
                return { text: 'No ok', message: 'Please enter a email' };
            }
            let account = await db.Account.findOne({
                where: { email: studentEmail, roleId: 3, isActive: true, isDeleted: false },
            });

            if (!account) {
                console.log('Cant find account');
                return { text: 'No ok', message: 'Can not find account' };
            }

            const student = await db.Student.findOne({
                where: { accountId: account?.id, isDeleted: 0 },
            });
            if (student?.classId) {
                return { text: 'No ok', message: 'Student had class' };
            }

            return {
                text: 'Ok',
                message: 'Add student into class successfully',
            };
        } catch (e) {
            console.log(e);
            return e;
        }
    },

    removeStudentFromClass: async (studentId) => {
        try {
            await db.Student.update({ classId: -1 }, { where: { id: studentId } });
            return 204;
        } catch (e) {
            console.error('Can not remove student from class');
            console.error(e.stack);
            return 400;
        }
    },
};
