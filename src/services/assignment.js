const sequelize = require('sequelize');
const moment = require('moment');
const db = require('../models/index');
const { respMapper, errorResp } = require('../helper/helper');
const e = require('express');

module.exports = {
    findAssignmentSummary: async (id) => {
        try {
            const assignment = await db.Assignment.findByPk(id, {
                where: { isDeleted: 0 },
                attributes: {
                    exclude: ['isDeleted', 'createdAt', 'updatedAt'],
                },
                raw: true,
            });
            if (!assignment) return errorResp(409, 'Assignment not found');
            assignment.students = await db.Student.findAll({
                where: { isDeleted: 0 },
                attributes: {
                    exclude: ['isDeleted', 'createdAt', 'updatedAt'],
                },
                include: [
                    {
                        attributes: {
                            exclude: ['isDeleted', 'createdAt', 'updatedAt'],
                        },
                        model: db.Student_Assignment,
                        as: 'studentAssignment',
                        where: { assignmentId: id, isDeleted: 0 },
                    },
                    {
                        attributes: ['avatarImg'],
                        model: db.Account,
                        as: 'account',
                        where: { isDeleted: 0 },
                    },
                ],
                // raw: true,
            });
            const avgScoreOfStudent = await db.Student.findAll({
                where: { isDeleted: 0 },
                attributes: [
                    'id',
                    [sequelize.fn('AVG', sequelize.col('score')), 'avgScoreOfStudent'],
                ],
                include: [
                    {
                        attributes: [],
                        model: db.Student_Assignment,
                        as: 'studentAssignment',
                        where: { assignmentId: id, isDeleted: 0 },
                    },
                ],
                group: ['id'],
                raw: true,
            });
            assignment.skills = await db.Skill.findAll({
                where: { isDeleted: 0 },
                attributes: {
                    exclude: ['isDeleted', 'createdAt', 'updatedAt'],
                },
                include: [
                    {
                        attributes: [],
                        model: db.Skill_Assignment,
                        as: 'skillAssignment',
                        where: { assignmentId: id, isDeleted: 0 },
                    },
                ],
                raw: true,
            });
            assignment.classes = await db.Class.findAll({
                where: { isDeleted: 0 },
                attributes: {
                    exclude: ['isDeleted', 'createdAt', 'updatedAt'],
                },
                include: [
                    {
                        attributes: {
                            exclude: ['isDeleted', 'createdAt', 'updatedAt'],
                        },
                        model: db.Class_Assignment,
                        as: 'classAssignment',
                        where: { assignmentId: id, isDeleted: 0 },
                    },
                ],
                raw: true,
            });
            const numberQuestionOfAssignment = await db.Assignment.findByPk(id, {
                where: { isDeleted: 0 },
                attributes: [
                    'id',
                    [
                        sequelize.fn('COUNT', sequelize.col('assignmentQuestion.id')),
                        'numberQuestionOfAssignment',
                    ],
                ],
                include: [
                    {
                        attributes: [],
                        model: db.Assignment_Question,
                        as: 'assignmentQuestion',
                        where: { isDeleted: 0 },
                        required: false,
                    },
                ],
                group: 'id',
                raw: true,
            });
            assignment.studentPassed = 0;
            assignment.studentFailed = 0;
            assignment.studentLateSubmit = 0;
            assignment.studentNotSubmit = 0;
            const students = assignment.students;
            if (students)
                for (let i = 0; i < students.length; i++) {
                    if (students[i].studentAssignment[0].dateComplete) {
                        if (students[i].studentAssignment[0].score >= assignment.passScore)
                            assignment.studentPassed = assignment.studentPassed + 1;
                        else assignment.studentFailed = assignment.studentFailed + 1;
                        if (
                            moment(assignment.dateDue).diff(
                                moment(students[i].studentAssignment[0].dateComplete)
                            ) < 0
                        )
                            assignment.studentLateSubmit = assignment.studentLateSubmit + 1;
                    } else assignment.studentNotSubmit = assignment.studentNotSubmit + 1;
                }
            assignment.avgScoreOfStudent =
                avgScoreOfStudent[0] && avgScoreOfStudent[0].avgScoreOfStudent;
            assignment.numberQuestionOfAssignment =
                numberQuestionOfAssignment.numberQuestionOfAssignment;
            return respMapper(200, assignment);
        } catch (error) {
            if (error.stack) {
                console.log(error.message);
                console.log(error.stack);
            }
            throw errorResp(400, error.message);
        }
    },

    findAssignment: async (id) => {
        try {
            const assignment = await db.Assignment.findByPk(id, {
                where: { isDeleted: 0 },
                attributes: {
                    exclude: ['isDeleted', 'createdAt', 'updatedAt'],
                },
                raw: true,
            });
            if (!assignment)
                throw {
                    message: 'Assignment not found',
                };
            assignment.questions = await db.Assignment_Question.findAll({
                where: { assignmentId: assignment.id, isDeleted: 0 },
                attributes: {
                    exclude: ['isDeleted', 'createdAt', 'updatedAt'],
                },
                raw: true,
            });
            return respMapper(200, assignment);
        } catch (error) {
            if (error.stack) console.log(error.stack);
            throw errorResp(400, error.message);
        }
    },
    findAssignmentsByTeacherId: async (teacherId) => {
        try {
            let assignments = await db.Assignment.findAll({
                where: { teacherId: teacherId, isDeleted: 0 },
                attributes: {
                    exclude: ['isDeleted', 'createdAt', 'updatedAt'],
                },
                raw: true,
            });
            return assignments;
        } catch (e) {
            if (error.stack) console.log(error.stack);
            throw errorResp(400, error.message);
        }
    },
    createAssignment: async (assignment) => {
        try {
            return respMapper(200, {
                message: 'Assignment created successfully',
                result: await db.Assignment.create(assignment),
            });
        } catch (e) {
            if (error.stack) console.log(error.stack);
            throw errorResp(400, error.message);
        }
    },
    updateAssignment: async (id, assignmentUpdate) => {
        try {
            const assignment = await db.Assignment.update(
                { ...assignmentUpdate },
                {
                    where: { id, isDeleted: 0 },
                }
            );
            return respMapper(200, {
                message: 'Assignment updated successfully',
                result: assignment,
            });
        } catch (e) {
            if (error.stack) console.log(error.stack);
            throw errorResp(400, error.message);
        }
    },
    deleteAssignment: async (id) => {
        try {
            const assignment = await db.Assignment.findByPk(id);
            if (assignment) {
                if (assignment.isDeleted) {
                    return 'This assignment has been deleted';
                }
                assignment.isDeleted = true;
                await assignment.save();
                await db.Assignment_Question.update(
                    { isDeleted: true },
                    {
                        where: { assignmentId: id, isDeleted: false },
                    }
                );
                return 'Assignment deleted successfully';
            }
            return 'This assignment does not exist';
        } catch (e) {
            if (error.stack) console.log(error.stack);
            throw errorResp(400, error.message);
        }
    },
};
