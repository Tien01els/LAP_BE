const { classService } = require('../services/index');

module.exports = {
    getClasses: async (req, res) => {
        let teacherId = req.params.teacherId;
        let classes = await classService.findClassesByTeacherId(teacherId);
        console.log(classes);
        return res.send(classes);
    },
    getClassesByTeacherIdAndGradeId: async (req, res) => {
        const teacherId = req.params.teacherId;
        const gradeId = req.params.gradeId;
        let classes = await classService.findClassesByTeacherIdAndGradeId(
            teacherId,
            gradeId
        );
        console.log(classes);
        return res.send(classes);
    },
};
