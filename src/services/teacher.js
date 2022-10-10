const db = require('../models/index');

module.exports = {
    createTeacher: async (teacher) => {
        try {
            let teacherNew = await db.Teacher.create(teacher);
            return teacherNew;
        } catch (e) {
            console.log(e);
            return e;
        }
    },
    findTeacher: async (id) => {
        try {
            let teacher = await db.Teacher.findByPk(id, {
                where: { isDeleted: 0 },
                attributes: {
                    exclude: ['isDeleted', 'createdAt', 'updatedAt'],
                },
                raw: true,
            });
            return teacher;
        } catch (e) {
            console.log(e);
            return e;
        }
    },
    findTeacherByAccount: async (accountId) => {
        try {
            let teacher = await db.Teacher.findOne({
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
            return teacher;
        } catch (e) {
            console.log(e);
            return e;
        }
    },
};
