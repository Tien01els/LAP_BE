const { classService } = require('../services/index');

module.exports = {
    getClassesByTeacherIdAndGradeId: async (req, res) => {
        const checkParams = req && req.params;
        const teacherId = checkParams && req.params.teacherId;
        const gradeId = checkParams && req.params.gradeId;
        let classes = await classService.findClassesByTeacherIdAndGradeId(
            teacherId,
            gradeId
        );
        console.log(classes);
        return res.send(classes);
    },
};