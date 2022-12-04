const db = require('../models/index');
const { respMapper, errorResp } = require('../helper/helper');

module.exports = {
    findQuestionByAssignmentIdForTeacher: async (teacherId, assignmentId) => {
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
            const listCurrentTeacherQuestion = await db.Teacher_Question.findAll({
                where: { teacherId, assignmentId, isDeleted: 0 },
                attributes: {
                    exclude: ['isDeleted', 'createdAt', 'updatedAt'],
                },
                raw: true,
            });

            let existTeacherQuestions = new Array();
            let listExistTeacherQuestion = new Array();
            let listUpdateTeacherQuestion = new Array();

            for (let i = 0; i < listCurrentTeacherQuestion.length; i++) {
                if (listQuestion.includes(listCurrentTeacherQuestion[i].questionId)) {
                    listExistTeacherQuestion.push(listCurrentTeacherQuestion[i].questionId);
                    existTeacherQuestions.push(listCurrentTeacherQuestion[i]);
                    await db.Teacher_Question.update(
                        { isDeleted: false },
                        {
                            where: {
                                teacherId,
                                questionId: listCurrentTeacherQuestion[i].questionId,
                                isDeleted: false,
                            },
                        }
                    );
                    continue;
                }

                await db.Teacher_Question.update(
                    { isDeleted: true },
                    {
                        where: {
                            teacherId,
                            questionId: listCurrentTeacherQuestion[i].questionId,
                            isDeleted: false,
                        },
                    }
                );
            }
            for (let i = 0; i < listQuestion.length; i++)
                if (!listExistTeacherQuestion.includes(listQuestion[i]))
                    listUpdateTeacherQuestion.push(listQuestion[i]);

            const listTeacherQuestion = new Array();
            for (let i = 0; i < listUpdateTeacherQuestion.length; ++i)
                listTeacherQuestion.push({
                    isCorrect: 0,
                    isDeleted: false,
                    teacherId,
                    assignmentId,
                    questionId: listUpdateTeacherQuestion[i],
                });
            const teacherQuestionNew = await db.Teacher_Question.bulkCreate(listTeacherQuestion);

            const teacherQuestions = [...teacherQuestionNew, ...existTeacherQuestions];
            for (let i = 0; i < listAssignmentQuestion.length; ++i) {
                const teacherQuestion = teacherQuestions.find(
                    (teacherQuestion) =>
                        teacherQuestion.questionId === listAssignmentQuestion[i].questionId
                );
                teacherQuestion.answer =
                    teacherQuestion.answer && JSON.parse(teacherQuestion.answer);

                listAssignmentQuestion[i].answerOfRespondent = {
                    respondentQuestionId: teacherQuestion.id,
                    answer: teacherQuestion.answer || null,
                    isCorrect: teacherQuestion.isCorrect,
                };
            }

            const result = new Array();
            for (let i = 0; i < listAssignmentQuestion.length; i++) {
                const option = JSON.parse(listAssignmentQuestion[i].option);
                delete listAssignmentQuestion[i].option;
                const contentQuestion = {
                    multiChoice: option?.multiChoice.map((option) => ({ answer: option?.answer })),
                    trueFalse: option?.trueFalse.map((option) => ({ answer: option?.answer })),
                    input: [],
                    multiSelect: option?.multiSelect.map((option) => ({ answer: option?.answer })),
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
    saveAnswerOfTeacher: async (id, answer) => {
        try {
            const currentTeacherQuestion = await db.Teacher_Question.findByPk(id, {
                where: {
                    isDeleted: 0,
                },
                attributes: {
                    exclude: ['isDeleted', 'createdAt', 'updatedAt'],
                },
            });
            if (!currentTeacherQuestion) return errorResp(409, 'Question of teacher not found');

            const question = await db.Question.findByPk(currentTeacherQuestion.questionId, {
                where: {
                    isDeleted: 0,
                },
                attributes: {
                    exclude: ['isDeleted', 'createdAt', 'updatedAt'],
                },
            });
            if (!currentTeacherQuestion) return errorResp(409, 'Question not found');

            const option = question?.option && JSON.parse(question.option);
            let isCorrect = false;
            if (question?.questionTypeId === 1) {
                const resultTrue = option?.multiChoice.find(
                    (optionMultiChoice, i) => optionMultiChoice?.isTrue === true
                );
                const answerOfTeacher = answer?.multiChoice.find(
                    (optionMultiChoice, i) => optionMultiChoice?.isTrue === true
                );
                if (resultTrue?.answer === answerOfTeacher?.answer) isCorrect = true;
            }

            if (question?.questionTypeId === 2) {
                const resultTrue = option?.trueFalse.find(
                    (optionTrueFalse) => optionTrueFalse?.isTrue === true
                );
                const answerOfTeacher = answer?.trueFalse.find(
                    (optionTrueFalse) => optionTrueFalse?.isTrue === true
                );
                if (resultTrue?.answer === answerOfTeacher?.answer) isCorrect = true;
            }

            if (question?.questionTypeId === 3) {
                if (option?.input[0]?.answer === answer?.input[0]?.answer) isCorrect = true;
            }

            if (question?.questionTypeId === 4) {
                isCorrect = true;
                for (let i = 0; i < option?.multiSelect.length; ++i)
                    if (
                        !answer?.multiSelect?.find(
                            (multiSelect) =>
                                multiSelect?.isTrue === option?.multiSelect[i]?.isTrue &&
                                multiSelect?.answer === option?.multiSelect[i]?.answer
                        )
                    )
                        isCorrect = false;
            }
            await currentTeacherQuestion.update({ answer: JSON.stringify(answer), isCorrect });

            return respMapper(200, 'Answer of teacher saved successfully');
        } catch (error) {
            if (error.stack) {
                console.log(error.message);
                console.log(error.stack);
            }
            throw errorResp(400, error.message);
        }
    },
};
