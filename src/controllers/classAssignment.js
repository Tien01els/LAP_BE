const {
    classAssignmentService,
    studentService,
    assignmentService,
    studentAssignmentService,
} = require('../services/index');

module.exports = {
    postClassAssignment: async (req, res) => {
        const classId = req.body.classId;
        const assignmentId = req.body.assignmentId;

        const checkClassAssignment =
            await classAssignmentService.findClassAssignment(
                classId,
                assignmentId
            );
        if (!checkClassAssignment) {
            const classAssignment = {
                dateOpen: req.body.dateOpen || new Date(),
                classId,
                assignmentId,
                isDeleted: 0,
            };
            let classAssignmentNew =
                await classAssignmentService.createClassAssignment(
                    classAssignment
                );

            let assignment = await assignmentService.findAssignment(
                assignmentId
            );
            if (assignment) {
                let students = await studentService.findStudentsbyClassId(
                    classId
                );
                let studentAssignments = new Array();
                for (let i = 0; i < students.length; i++) {
                    studentAssignments.push({
                        status: 0,
                        dateRequest: '1900-01-01 00:00:00',
                        redo: assignment.redo,
                        isRedo: 0,
                        isDeleted: 0,
                        studentId: students[i].id,
                        assignmentId,
                    });
                }
                await studentAssignmentService.createListStudentAssignment(
                    studentAssignments
                );
                return res.send(classAssignmentNew);
            }
            return res.send('This assignment does not exist');
        }
        return res.send('This class assignment already exists');
    },
    deleteClassAssignment: async (req, res) => {
        let id = req.params.id;
        let classAssignmentDeleted = await classAssignmentService.deleteClassAssignment(id);
        return res.send(classAssignmentDeleted);
    }
};
