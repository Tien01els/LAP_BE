const db = require('../models/index');
const { respMapper, errorResp } = require('../helper/helper');

module.exports = {
    findAssignemtnOfClass: async (classId) => {
        try {
            const assignmentOFClass = await db.Class_Assignment.findAll({
                where: { classId, isDeleted: 0 },
                include: [
                    {
                        model: db.Assignment,
                        as: 'assignment',
                        attributes: { exclude: ['isDeleted', 'createdAt', 'updatedAt'] },
                        where: { isDeleted: 0 },
                        require: false,
                    },
                ],
                attributes: { exclude: ['isDeleted', 'createdAt', 'updatedAt'] },
            });
            return respMapper(200, assignmentOFClass);
        } catch (error) {
            if (error.stack) console.log(error.stack);
            throw errorResp(400, error.message);
        }
    },
    createClassAssignment: async (classId, assignmentId, dateOpen) => {
        try {
            const checkClassAssignment = await db.Class_Assignment.findOne({
                where: { classId, assignmentId, isDeleted: 0 },
                attributes: { exclude: ['isDeleted', 'createdAt', 'updatedAt'] },
                raw: true,
            });

            if (checkClassAssignment) return errorResp(409, 'This class assignment already exists');
            let assignment = await db.Assignment.findByPk(assignmentId, {
                where: { isDeleted: 0 },
                attributes: {
                    exclude: ['isDeleted', 'createdAt', 'updatedAt'],
                },
                raw: true,
            });
            if (!assignment) return errorResp(422, 'This assignment does not exist');

            const classAssignment = {
                dateOpen: dateOpen || new Date(),
                classId,
                assignmentId,
            };
            let classAssignmentNew = await db.Class_Assignment.create(classAssignment);
            return respMapper(201, classAssignmentNew);
        } catch (error) {
            if (error.stack) console.log(error.stack);
            throw errorResp(400, error.message);
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
