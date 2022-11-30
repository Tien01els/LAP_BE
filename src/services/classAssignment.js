const db = require('../models/index');
const sequelize = require('sequelize');
const { respMapper, errorResp } = require('../helper/helper');

module.exports = {
    findAssignmentOfClass: async (classId) => {
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
    createClassAssignment: async (classId, assignmentId, dateOpen, dateDue) => {
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
                dateOpen,
                dateDue,
                classId,
                assignmentId,
                isDeleted: false,
            };
            let classAssignmentNew = await db.Class_Assignment.create(classAssignment);
            return respMapper(201, classAssignmentNew);
        } catch (error) {
            if (error.stack) console.log(error.stack);
            throw errorResp(400, error.message);
        }
    },
    updateDueDateOfClassAssignment: async (classId, assignmentId, dueDay) => {
        try {
            const classAssignment = await db.Class_Assignment.findOne({
                where: { classId, assignmentId, isDeleted: 0 },
            });
            if (!classAssignment) return errorResp(409, 'This assignment of class does not exist');
            if (dueDay)
                classAssignment.dateDue = new Date(
                    new Date(classAssignment.dateOpen).getTime() +
                        24 * 60 * 60 * parseInt(dueDay) * 1000
                );
            return respMapper(204, await classAssignment.save());
        } catch (error) {
            if (error.stack) console.log(error.stack);
            throw errorResp(400, error.message);
        }
    },
    deleteClassAssignment: async (id) => {
        try {
            const classAssignment = await db.Class_Assignment.findByPk(id);
            if (!classAssignment) return errorResp(409, 'This assignment of class does not exist');
            const assignment = await db.Assignment.findByPk(classAssignment.assignmentId);
            if (!assignment) return errorResp(409, 'This assignment does not exist');

            await db.Student_Assignment.update(
                {
                    isDeleted: true,
                },
                {
                    where: {
                        assignmentId: classAssignment.assignmentId,
                        isDeleted: false,
                    },
                }
            );

            await assignment.update({ isDeleted: true });
            await classAssignment.update({ isDeleted: true });
            return respMapper(204, 'Assignment of class deleted successfully');
        } catch (error) {
            if (error.stack) console.log(error.stack);
            throw errorResp(400, error.message);
        }
    },
};
