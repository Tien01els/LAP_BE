const { classService } = require('../services/index');

module.exports = {
    getClassInfo: async (req, res) => {
        try {
            const id = req.params.id;
            let result = await classService.findClassInfo(id);
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            return res.status(errorStatus).send(error.data);
        }
    },
    getClasses: async (req, res) => {
        console.log(1);
        const teacherId = req.params.teacherId;
        const classes = await classService.findClassesByTeacherId(teacherId);
        return res.send(classes);
    },
    getClassesByTeacherIdAndGradeId: async (req, res) => {
        const teacherId = req.params.teacherId;
        const gradeId = req.params.gradeId;
        const classes = await classService.findClassesByTeacherIdAndGradeId(
            teacherId,
            gradeId
        );
        return res.send(classes);
    },
};
