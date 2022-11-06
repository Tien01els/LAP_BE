const db = require('../models/index');
const { respMapper, errorResp } = require('../helper/helper');

module.exports = {
    createQuestionByAssignmentIdForStudent: async (assignmentId, studentId) => {
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
            const questionForStudent = listAssignmentQuestion?.map((assignmentQuestion) => {
                return {
                    isCorrect: 0,
                    redoTime: 0,
                    isDeleted: 0,
                    studentId,
                    assignmentQuestionId: assignmentQuestion.id,
                };
            });

            const studentQuestionNew = await db.Student_Question.bulkCreate(questionForStudent);
            for (let i = 0; i < listAssignmentQuestion.length; ++i) {
                const studentQuestion = studentQuestionNew.find(
                    (studentQuestion) =>
                        studentQuestion.assignmentQuestionId === listAssignmentQuestion[i].id
                );
                listAssignmentQuestion[i].answerOfStudent = {
                    studentQuestionId: studentQuestion.id,
                    answer: studentQuestion.answer || null,
                };
            }
            console.log(listAssignmentQuestion[0].answerOfStudent);
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
};
