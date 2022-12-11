const { gradeService } = require('../services/index');

module.exports = {
    getAllGrades: async (req, res) => {
        try {
            let result = await gradeService.findAllGrades();
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            console.log(error);
            return res.status(errorStatus).send(error.data);
        }
    },
    getGradeOfTeacher: async (req, res) => {
        try {
            let result = await gradeService.findGradeByTeacher(req.userId);
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            console.log(error);
            return res.status(errorStatus).send(error.data);
        }
    },
    getRoadMap: async (req, res) => {
        try {
            let gradeId = req.params.id;
            let result = await gradeService.findRoadMap(gradeId);
            return res.status(200).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            console.log(error);
            return res.status(errorStatus).send(error.data);
        }
    },
    getGradeOfClass: async (req, res) => {
        try {
            let classId = req.params.classId;
            let result = await gradeService.findGradeOfClass(classId);
            return res.status(200).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            console.log(error);
            return res.status(errorStatus).send(error.data);
        }
    },
    postGrade: async (req, res) => {
        try {
            const grade = {
                gradeName: req.body.gradeName,
                isDeleted: false,
            };
            const result = await gradeService.createGrade(grade);
            return res.status(200).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            console.log(error);
            return res.status(errorStatus).send(error.data);
        }
    },
    deleteGrade: async (req, res) => {
        try {
            const id = req.params.id;
            const result = await gradeService.deleteGrade(id);
            return res.status(200).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            console.log(error);
            return res.status(errorStatus).send(error.data);
        }
    },
};
