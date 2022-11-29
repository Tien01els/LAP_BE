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
        try {
            const teacherId = req.userId;
            let result = await classService.findClassesByTeacherId(teacherId);
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            return res.status(errorStatus).send(error.data);
        }
    },
    getClassesByTeacherIdAndGradeId: async (req, res) => {
        try {
            const teacherId = req.userId;
            const gradeId = req.params.gradeId;
            let result = await classService.findClassesByTeacherIdAndGradeId(teacherId, gradeId);
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            return res.status(errorStatus).send(error.data);
        }
    },

    postClassInfo: async (req, res) => {
        try {
            const classInfo = {
                className: req.body.className,
                classCode: req.body.classCode,
                classImg: req.body.classImg,
                year: req.body.year,
                gradeId: req.body.gradeId,
                teacherId: req.userId,
                isDeleted: 0,
            };
            let result = await classService.createClassInfo(classInfo);
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            return res.status(errorStatus).send(error.data);
        }
    },

    putClassInfo: async (req, res) => {
        try {
            const id = req.params.id;
            const classInfo = {
                className: req.body.className,
                classCode: req.body.classCode,
                classImg: req.body.classImg,
                year: req.body.year,
            };
            let result = await classService.updateClassInfo(id, classInfo);
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            return res.status(errorStatus).send(error.data);
        }
    },

    deleteClassInfo: async (req, res) => {
        try {
            const id = req.params.id;
            let result = await classService.deleteClassInfo(id);
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            return res.status(errorStatus).send(error.data);
        }
    },
};
