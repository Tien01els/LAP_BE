const db = require('../models/index');

module.exports = {
    createListStudentAssignment: async (studentAssignments) => {
        try {
            let studentAssignmentNews = await db.Student_Assignment.bulkCreate(
                studentAssignments
            );
            return studentAssignmentNews;
        } catch (e) {
            console.log(e);
        }
    },
    createStudentAssignment: async (studentAssignment) => {
        try {
            let studentAssignmentNew = await db.Student_Assignment.create(
                studentAssignment
            );
            return studentAssignmentNew;
        } catch (e) {
            console.log(e);
        }
    },
};