const { gradeService } = require('../services/index');

module.exports = {
    getAllGrades: async (req, res) => {
        let grades = await gradeService.findAllGrades();
        return res.send(grades);
    },
};
