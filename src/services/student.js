const db = require('../models/index');

module.exports = {
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
