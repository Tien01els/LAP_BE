const db = require('../models/index');
const sequelize = require('sequelize');
const { respMapper, errorResp } = require('../helper/helper');

module.exports = {
    findAssignemtnOfClass: async (classId) => {
        try {
            const assignmentOfClass = await db.Class_Assignment.findAll({
                where: { classId, isDeleted: 0 },
                attributes: { exclude: ['isDeleted', 'createdAt', 'updatedAt'] },
                include: [
                    {
                        attributes: { exclude: ['isDeleted', 'createdAt', 'updatedAt'] },
                        model: db.Assignment,
                        as: 'assignment',
                        where: { isDeleted: 0 },
                        include: [
                            {
                                attributes: ['questionId'],
                                model: db.Assignment_Question,
                                as: 'assignmentQuestion',
                                where: { isDeleted: 0 },
                                required: false,
                                include: [
                                    {
                                        attributes: {
                                            exclude: ['isDeleted', 'createdAt', 'updatedAt'],
                                        },
                                        model: db.Question,
                                        as: 'question',
                                        where: { isDeleted: 0 },
                                        required: false,
                                    },
                                ],
                            },
                            {
                                attributes: ['studentId'],
                                model: db.Student_Assignment,
                                as: 'studentAssignment',
                                where: { isDeleted: 0 },
                                required: false,
                                include: [
                                    {
                                        attributes: [],
                                        model: db.Student,
                                        as: 'student',
                                        where: { isDeleted: 0 },
                                    },
                                ],
                            },
                        ],
                    },
                ],
                order: [['dateOpen', 'DESC']],
                // group: ['assignmentId'],
                // raw: true,
            });
            return respMapper(200, assignmentOfClass);
        } catch (error) {
            if (error.stack) {
                console.log(error.message);
                console.log(error.stack);
            }
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
