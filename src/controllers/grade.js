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
};
