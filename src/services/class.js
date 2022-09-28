const db = require('../models/index');

module.exports = {
    findClassesByTeacherIdAndGradeId: async (teacherId, gradeId) => {
        try {
            let classes = await db.Class.findAll({
                where: { teacherId, gradeId, isDeleted: 0 },
                raw: true,
            });
            return classes;
        } catch (e) {
            console.log(e);
        }
    },
};
