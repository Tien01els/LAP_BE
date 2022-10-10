const db = require('../models/index');

module.exports = {
    findStudent: async (id) => {
        try {
            let student = await db.Student.findByPk(id, {
                where: { isDeleted: 0 },
                attributes: {
                    exclude: [
                        'isDeleted',
                        'createdAt',
                        'updatedAt',
                    ],
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
                    exclude: [
                        'accountId',
                        'isDeleted',
                        'createdAt',
                        'updatedAt',
                    ],
                },
                raw: true,
            });
            return students;
        } catch (e) {
            console.log(e);
            return e;
        }
    },
    findStudentByAccount: async (accountId) => {
        try {
            let student = await db.Student.findOne({
                where: { accountId },
                attributes: {
                    exclude: [
                        'accountId',
                        'isDeleted',
                        'createdAt',
                        'updatedAt',
                    ],
                },
                raw: true,
            });
            return student;
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
};
