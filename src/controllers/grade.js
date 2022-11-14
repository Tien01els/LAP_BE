const { gradeService } = require('../services/index');

module.exports = {
    getAllGrades: async (req, res) => {
        try {
            let result = await gradeService.findAllGrades();
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            return res.status(errorStatus).send(error.data);
        }
    },
    getGradeOfTeacher: async (req, res) => {
        try {
            let result = await gradeService.findGradeByTeacher(req.userId);
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            return res.status(errorStatus).send(error.data);
        }
    }
};
