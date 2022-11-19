const db = require('../models/index');
const { respMapper, errorResp } = require('../helper/helper');

module.exports = {
    randomQuestionInArrayQuestion: (numberQuestion, listQuestion) => {
        const listAddedQuestion = new Array();
        for (let i = 0; i < numberQuestion; i++) {
            let indexRandomOfQuestion = -1;
            while (
                listAddedQuestion.includes(indexRandomOfQuestion) ||
                indexRandomOfQuestion === -1
            ) {
                indexRandomOfQuestion = Math.floor(Math.random() * numberQuestion);
            }
        }
        return [];
    },
    generateAssignmentQuestion: async (conditions) => {
        try {
            // number question, level, hint: true/false, questionType[]
            // skillId, topicId, gradeId, currentQuestions
            const {
                levels,
                isHint,
                questionTypes,
                gradeId,
                topicId,
                skillIds,
                numberQuestion,
                currentQuestions,
            } = conditions;
            const totalQuestion = await db.Question.findAll({
                where: { isDeleted: 0 },
                attributes: [
                    'id',
                    'content',
                    'image',
                    'option',
                    'level',
                    'hint',
                    'score',
                    'questionTypeId',
                    'teacherId',
                    'Skill_Questions.skillId',
                    'Skill_Questions.Skill.topicId',
                    'Skill_Questions.Skill.Topic.gradeId',
                ],
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
                raw: true,
            });

            let result = new Array();
            let resultLevel = new Array();
            for (let i = 0; i < levels.length; i++)
                resultLevel = [
                    ...resultLevel,
                    ...totalQuestion.filter(
                        (question) =>
                            question.level &&
                            question.level.toLowerCase() === levels[i].toLowerCase()
                    ),
                ];
            result = resultLevel;

            if (isHint === true)
                result = result.filter((result) => result.hint && result.hint.length > 0);
            else if (isHint === false)
                result = result.filter(
                    (result) => !result.hint || (result.hint && result.hint.length < 1)
                );

            let resultType = new Array();
            for (let i = 0; i < questionTypes.length; i++)
                resultType = [
                    ...resultType,
                    ...result.filter((question) => question.questionTypeId === questionTypes[i]),
                ];
            result = resultType;

            if (gradeId === 0 || gradeId) result = result.filter((res) => res.gradeId === gradeId);
            if (topicId === 0 || topicId) result = result.filter((res) => res.topicId === topicId);

            let resultSkill = new Array();
            for (let i = 0; i < skillIds.length; i++)
                resultSkill = [
                    ...resultSkill,
                    ...result.filter((question) => question.skillId === skillIds[i]),
                ];
            result = resultSkill;

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

            result = resultQuestions;

            let resultCurrentQuestion = result;
            for (let i = 0; i < currentQuestions.length; i++)
                resultCurrentQuestion = resultCurrentQuestion.filter(
                    (question) => question.id !== currentQuestions[i]
                );

            result = resultCurrentQuestion;

            const resultParse = new Array();
            for (let i = 0; i < result.length; i++) {
                result[i].option = result[i].option && JSON.parse(result[i].option);
                resultParse.push(result[i]);
            }
            result = resultParse;

            const listAddedQuestion = new Array();
            const finalResult = new Array();
            for (let i = 0; i < numberQuestion; i++) {
                if (listAddedQuestion.length < result.length) {
                    let indexRandomOfQuestion = -1;
                    while (
                        listAddedQuestion.includes(indexRandomOfQuestion) ||
                        indexRandomOfQuestion === -1
                    )
                        indexRandomOfQuestion = Math.floor(Math.random() * result.length);

                    listAddedQuestion.push(indexRandomOfQuestion);
                    finalResult.push(result[indexRandomOfQuestion]);
                    continue;
                }
                break;
            }

            return respMapper(200, finalResult);
        } catch (error) {
            if (error.stack) console.log(error.stack);
            throw errorResp(400, error.message);
        }
    },
    createListAssignmentQuestion: async (assignmentId, questionIds) => {
        try {
            const listAssignmentQuestion = new Array();
            for (let i = 0; i < questionIds.length; ++i)
                listAssignmentQuestion.push({
                    assignmentId: assignmentId,
                    questionId: questionIds[i],
                    isDeleted: false,
                });
            const listAssignmentQuestionNew = await db.Assignment_Question.bulkCreate(
                listAssignmentQuestion
            );
            return respMapper(200, listAssignmentQuestionNew);
        } catch (error) {
            if (error.stack) console.log(error.stack);
            throw errorResp(400, error.message);
        }
    },
    updateQuestionByAssignmentId: async (assignmentId, questionIds) => {
        try {
            let listCurrentQuestion = await db.Assignment_Question.findAll({
                where: { assignmentId, isDeleted: 0 },
                attributes: ['questionId'],
                raw: true,
            });
            listCurrentQuestion = listCurrentQuestion.map((question) => question.questionId);

            let listExistQuestion = [];
            let listUpdateQuestion = [];

            for (let i = 0; i < listCurrentQuestion.length; i++) {
                if (questionIds.includes(listCurrentQuestion[i])) {
                    listExistQuestion.push(listCurrentQuestion[i]);
                    await db.Assignment_Question.update(
                        { isDeleted: false },
                        {
                            where: {
                                assignmentId,
                                questionId: listCurrentQuestion[i],
                                isDeleted: false,
                            },
                        }
                    );
                    continue;
                }
                await db.Assignment_Question.update(
                    { isDeleted: true },
                    {
                        where: {
                            assignmentId,
                            questionId: listCurrentQuestion[i],
                            isDeleted: false,
                        },
                    }
                );
            }
            for (let i = 0; i < questionIds.length; i++)
                if (!listExistQuestion.includes(questionIds[i]))
                    listUpdateQuestion.push(questionIds[i]);

            const listAssignmentQuestion = new Array();
            for (let i = 0; i < listUpdateQuestion.length; ++i)
                listAssignmentQuestion.push({
                    assignmentId: assignmentId,
                    questionId: listUpdateQuestion[i],
                    isDeleted: false,
                });

            const listAssignmentQuestionNew = await db.Assignment_Question.bulkCreate(
                listAssignmentQuestion
            );

            return respMapper(200, listAssignmentQuestionNew);
        } catch (error) {
            if (error.stack) console.log(error.stack);
            throw errorResp(400, error.message);
        }
    },
    findQuestionByAssignmentId: async (assignmentId) => {
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

            const result = new Array();
            for (let i = 0; i < listAssignmentQuestion.length; i++) {
                listAssignmentQuestion[i].option =
                    listAssignmentQuestion[i].option &&
                    JSON.parse(listAssignmentQuestion[i].option);
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
            if (error.stack) console.log(error.stack);
            throw errorResp(400, error.message);
        }
    },
};
