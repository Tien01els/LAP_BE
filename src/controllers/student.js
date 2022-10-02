const { studentService } = require('../services/index');

module.exports = {
    getStudentsOfClass: async (req, res) => {
        let classId = req.params.classId;
        let students = await studentService.findStudentsbyClassId(classId);
        return res.send(students);
    },
};
