const db = require('../models/index');

module.exports = {
    createClassAssignment: async (classAssignment) => {
        try {
            let classAssignmentNew = await db.Class_Assignment.create(
                classAssignment
            );
            return classAssignmentNew;
        } catch (e) {
            console.log(e);
        }
    },
    findClassAssignment: async (classId, assignmentId) => {
        try {
            let classAssignment = await db.Class_Assignment.findOne({
                where: { classId, assignmentId, isDeleted: 0 },
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                raw: true,
            });
            return classAssignment;
        } catch (e) {
            console.log(e);
        }
    },
    deleteQuestion: async (id) => {
        try {
            const question = await db.Question.findByPk(id);
            if (question) {
                if (question.isDeleted) {
                    return 'This question has been deleted';
                }
                question.isDeleted = true;
                return await question.save();
            }
            return 'This question does not exist';
        } catch (e) {
            console.log(e);
        }
    },
};
