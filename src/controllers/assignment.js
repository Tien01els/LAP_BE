const { assignmentService } = require('../services/index');

module.exports = {
    //load assignments
    getDeadlines: async (req, res) => {
        let teacherId = req && req.params && req.params.teacherId;
        let assignments = await assignmentService.findAssignmentsByTeacherId(
            teacherId
        );
        return res.send(assignments);
    },
};
