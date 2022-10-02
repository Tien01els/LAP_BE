const { classService } = require('../services/index');

module.exports = {
    postClassAssignment: async (req, res) => {
        const classAssignment = {
            
        };
        let teacherId = req.params.teacherId;
        let classes = await classService.findClassesByTeacherId(teacherId);
        console.log(classes);
        return res.send(classes);
    },
};
