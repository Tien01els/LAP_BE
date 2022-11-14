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
    getClassesOfTeacher: async (req, res) => {
        const teacherId = req.userId;
        const classes = await classService.findClassesByTeacherId(teacherId);
        return res.send(classes);
    },
    getClassesByTeacherIdAndGradeId: async (req, res) => {
        const teacherId = req.userId;
        const gradeId = req.params.gradeId;
        const classes = await classService.findClassesByTeacherIdAndGradeId(teacherId, gradeId);
        return res.send(classes);
    },
};
