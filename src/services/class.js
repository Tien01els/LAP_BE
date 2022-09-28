
const db = require('../models/index');

module.exports = {
findClassesByTeacherId: async (teacherId) => {
    try {
      let classes = await db.Class.findAll({
        where: { teacherId: teacherId },
        raw: true,
      })
      return classes
    } catch (e) {
      console.log(e)
    }
  },
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
