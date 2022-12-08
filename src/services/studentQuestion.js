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
                    'question.skillQuestion.skillId',
                    'question.skillQuestion.skill.topicId',
                    'question.skillQuestion.skill.topic.gradeId',
                ],
                include: [
                    {
                        attributes: [],
                        model: db.Question,
                        as: 'question',
                        where: { isDeleted: 0 },
                        include: [
                            {
                                attributes: [],
                                model: db.Skill_Question,
                                as: 'skillQuestion',
                                where: { isDeleted: 0 },
                                include: [
                                    {
                                        attributes: [],
                                        model: db.Skill,
                                        as: 'skill',
                                        where: { isDeleted: 0 },
                                        include: [
                                            {
                                                attributes: [],
                                                model: db.Topic,
                                                as: 'topic',
                                                where: { isDeleted: 0 },
                                                include: [
                                                    {
                                                        attributes: [],
                                                        model: db.Grade,
                                                        as: 'grade',
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
                                questionId: listCurrentStudentQuestion[i].questionId,
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
                            questionId: listCurrentStudentQuestion[i].questionId,
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
                    isDeleted: false,
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

                listAssignmentQuestion[i].answerOfRespondent = {
                    respondentQuestionId: studentQuestion.id,
                    answer: studentQuestion.answer || null,
                    isCorrect: studentQuestion.isCorrect,
                };
            }

            const result = new Array();
            for (let i = 0; i < listAssignmentQuestion.length; i++) {
                const option = JSON.parse(listAssignmentQuestion[i].option);
                delete listAssignmentQuestion[i].option;
                const contentQuestion = option && {
                    multiChoice: option.multiChoice.map((option) => ({ answer: option.answer })),
                    trueFalse: option.trueFalse.map((option) => ({ answer: option.answer })),
                    input: [],
                    multiSelect: option.multiSelect.map((option) => ({ answer: option.answer })),
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
            if (!currentStudentQuestion) return errorResp(409, 'Question of student not found');

            const question = await db.Question.findByPk(currentStudentQuestion.questionId, {
                where: {
                    isDeleted: 0,
                },
                attributes: {
                    exclude: ['isDeleted', 'createdAt', 'updatedAt'],
                },
            });
            if (!currentStudentQuestion) return errorResp(409, 'Question not found');

            const option = question && question.option && JSON.parse(question.option);
            let isCorrect = false;
            if (question && question.questionTypeId === 1) {
                const resultTrue =
                    option &&
                    option.multiChoice.find(
                        (optionMultiChoice, i) => optionMultiChoice.isTrue === true
                    );
                const answerOfStudent =
                    answer &&
                    answer.multiChoice.find(
                        (optionMultiChoice, i) => optionMultiChoice.isTrue === true
                    );
                if (resultTrue && answerOfStudent)
                    if (resultTrue.answer === answerOfStudent.answer) isCorrect = true;
            }

            if (question && question.questionTypeId === 2) {
                const resultTrue =
                    option &&
                    option.trueFalse.find((optionTrueFalse) => optionTrueFalse.isTrue === true);
                const answerOfStudent =
                    answer &&
                    answer.trueFalse.find((optionTrueFalse) => optionTrueFalse.isTrue === true);
                if (resultTrue && answerOfStudent)
                    if (resultTrue.answer === answerOfStudent.answer) isCorrect = true;
            }

            if (question && question.questionTypeId === 3) {
                if (option && answer)
                    if (option.input[0].answer === answer.input[0].answer) isCorrect = true;
            }

            if (question && question.questionTypeId === 4) {
                isCorrect = true;
                if (option && answer)
                    for (let i = 0; i < option.multiSelect.length; ++i)
                        if (
                            !answer.multiSelect.find(
                                (multiSelect) =>
                                    multiSelect.isTrue === option.multiSelect[i].isTrue &&
                                    multiSelect.answer === option.multiSelect[i].answer
                            )
                        )
                            isCorrect = false;
            }

            return respMapper(
                200,
                await currentStudentQuestion.update({ answer: JSON.stringify(answer), isCorrect })
            );
        } catch (error) {
            if (error.stack) {
                console.log(error.message);
                console.log(error.stack);
            }
            throw errorResp(400, error.message);
        }
    },
};
