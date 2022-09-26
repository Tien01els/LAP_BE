const { gradeService } = require('../services/index');

module.exports = {
    getAllGrades: async (req, res) => {
        let grades = await gradeService.findAllGrades();
        console.log(grades);
        return res.send(grades);
    },
};
