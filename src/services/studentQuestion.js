const db = require('../models/index');
const { respMapper, errorResp } = require('../helper/helper');

module.exports = {
    findQuestionByAssignmentIdForStudent: async (studentId, assignmentId) => {
        try {
            const listAssignmentQuestion = await db.Assignment_Question.findAll({
                where: { assignmentId, isDeleted: 0 },
                attributes: [
                    'id',
                    'questionId',
                    'question.content',
                    'question.image',
                    'question.option',
                    'question.level',
                    'question.hint',
                    'question.score',
                    'question.questionTypeId',
                    'question.teacherId',
                    'question.skill_questions.skillId',
                    'question.skill_questions.skill.topicId',
                    'question.skill_questions.skill.topic.gradeId',
                ],
                include: [
                    {
                        attributes: [],
                        model: db.Question,
                        where: { isDeleted: 0 },
                        include: [
                            {
                                attributes: [],
                                model: db.Skill_Question,
                                where: { isDeleted: 0 },
                                include: [
                                    {
                                        attributes: [],
                                        model: db.Skill,
                                        where: { isDeleted: 0 },
                                        include: [
                                            {
                                                attributes: [],
                                                model: db.Topic,
                                                where: { isDeleted: 0 },
                                                include: [
                                                    {
                                                        attributes: [],
                                                        model: db.Grade,
                                                        where: { isDeleted: 0 },
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
                raw: true,
            });
            const listQuestion = listAssignmentQuestion.map(
                (assignmentQuestion) => assignmentQuestion.questionId
            );
            const listCurrentStudentQuestion = await db.Student_Question.findAll({
                where: { studentId, assignmentId, isDeleted: 0 },
                attributes: {
                    exclude: ['isDeleted', 'createdAt', 'updatedAt'],
                },
                raw: true,
            });
            let existStudentQuestions = new Array();
            let listExistStudentQuestion = new Array();
            let listUpdateStudentQuestion = new Array();

            for (let i = 0; i < listCurrentStudentQuestion.length; i++) {
                if (listQuestion.includes(listCurrentStudentQuestion[i].questionId)) {
                    listExistStudentQuestion.push(listCurrentStudentQuestion[i].questionId);
                    existStudentQuestions.push(listCurrentStudentQuestion[i]);
                    await db.Student_Question.update(
                        { isDeleted: false },
                        {
                            where: {
                                studentId,
                                assignmentId,
                                isDeleted: false,
                            },
                        }
                    );
                    continue;
                }
                await db.Student_Question.update(
                    { isDeleted: true },
                    {
                        where: {
                            studentId,
                            assignmentId,
                            isDeleted: false,
                        },
                    }
                );
            }
            for (let i = 0; i < listQuestion.length; i++)
                if (!listExistStudentQuestion.includes(listQuestion[i]))
                    listUpdateStudentQuestion.push(listQuestion[i]);

            const listStudentQuestion = new Array();
            for (let i = 0; i < listUpdateStudentQuestion.length; ++i)
                listStudentQuestion.push({
                    isCorrect: 0,
                    redoTime: 0,
                    isDeleted: 0,
                    studentId,
                    assignmentId,
                    questionId: listUpdateStudentQuestion[i],
                });
            const studentQuestionNew = await db.Student_Question.bulkCreate(listStudentQuestion);

            const studentQuestions = [...studentQuestionNew, ...existStudentQuestions];
            for (let i = 0; i < listAssignmentQuestion.length; ++i) {
                const studentQuestion = studentQuestions.find(
                    (studentQuestion) =>
                        studentQuestion.questionId === listAssignmentQuestion[i].questionId
                );
                studentQuestion.answer =
                    studentQuestion.answer && JSON.parse(studentQuestion.answer);

                listAssignmentQuestion[i].answerOfStudent = {
                    studentQuestionId: studentQuestion.id,
                    answer: studentQuestion.answer || null,
                };
            }

            const result = new Array();
            for (let i = 0; i < listAssignmentQuestion.length; i++) {
                const option = JSON.parse(listAssignmentQuestion[i].option);
                delete listAssignmentQuestion[i].option;
                const contentQuestion = {
                    multiChoice: option?.multiChoice.map((option) => ({ answer: option?.answer })),
                    multiSelect: option?.multiSelect.map((option) => ({
                        id: option?.id,
                        answer: option?.answer,
                    })),
                    input: [],
                    trueFalse: option?.trueFalse.map((option) => ({ answer: option?.answer })),
                };
                listAssignmentQuestion[i].contentQuestion = contentQuestion;
                result.push(listAssignmentQuestion[i]);
            }

            let resultQuestions = new Array();
            for (let i = 0; i < result.length; i++) {
                const indexQuestion = -1;
                for (let j = 0; j < resultQuestions.length; j++)
                    if (result[i].id === resultQuestions[j].id) indexQuestion = j;

                if (indexQuestion === -1) {
                    result[i].skillIds = [result[i].skillId];
                    delete result[i].skillId;
                    resultQuestions.push(result[i]);
                } else {
                    const indexSkill = resultQuestions[indexQuestion].skillIds.indexOf(
                        result[i].skillId
                    );
                    if (indexSkill === -1)
                        resultQuestions[indexQuestion].skillIds.push(result[i].skillId);
                }
            }
            return respMapper(200, resultQuestions);
        } catch (error) {
            if (error.stack) {
                console.log(error.message);
                console.log(error.stack);
            }
            throw errorResp(400, error.message);
        }
    },
    saveAnswerOfStudent: async (id, answer) => {
        try {
            const currentStudentQuestion = await db.Student_Question.findByPk(id, {
                where: {
                    isDeleted: 0,
                },
                attributes: {
                    exclude: ['isDeleted', 'createdAt', 'updatedAt'],
                },
            });
            if (!currentStudentQuestion) return errorResp(400, 'Question not found');
            return respMapper(200, await currentStudentQuestion.update({ answer }));
        } catch (error) {
            if (error.stack) {
                console.log(error.message);
                console.log(error.stack);
            }
            throw errorResp(400, error.message);
        }
    },
};
