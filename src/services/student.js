const db = require('../models/index');

module.exports = {
    findStudent: async (id) => {
        try {
            let student = await db.Student.findByPk(id, {
                where: { isDeleted: 0 },
                raw: true,
            });
            return student;
        } catch (e) {
            console.log(e);
        }
    },
    findStudentsbyClassId: async (classId) => {
        try {
            let students = await db.Student.findAll({
                where: { classId, isDeleted: 0 },
                raw: true,
            });
            return students;
        } catch (e) {
            console.log(e);
        }
    },
};
