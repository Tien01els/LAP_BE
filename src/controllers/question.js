const { questionService, skillQuestionService } = require('../services/index');

module.exports = {
    getQuestionBank: async (req, res) => {
        //query
        //grades -- topics -- skills

        const gradeId = req.query.gradeId;
        const topicId = req.query.topicId;
        const skillId = req.query.skillId;
        const level = req.query.level;
        const questions = await questionService.findQuestionBank(
            gradeId,
            topicId,
            skillId,
            level
        );
        const bankQuestion = new Array();

        for (let i = 0; i < questions.length; i++) {
            const questionInBank = bankQuestion.find(
                (question) => question.id === questions[i].id
            );

            if (!questionInBank) {
                questions[i].option =
                    questions[i].option && JSON.parse(questions[i].option);
                bankQuestion.push(questions[i]);
                continue;
            }
        }
        return res.json(bankQuestion);
    },
    getQuestion: async (req, res) => {
        try {
            let result = await questionService.findQuestion(req.params.id);
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            return res.status(errorStatus).send(error.data);
        }
    },
    postQuestion: async (req, res) => {
        console.log(req.body.level);
        const question = {
            content: req.body.content,
            image: req.body.image || '',
            option: req.body.option && JSON.stringify(req.body.option),
            level: req.body.level || '',
            hint: req.body.hint || '',
            score: req.body.score,
            questionTypeId: req.body.questionTypeId,
            teacherId: req.body.teacherId,
            isDeleted: 0,
        };
        let questionNew = await questionService.createQuestion(question);

        const skillIds = req.body.skillIds || new Array();

        const listSkillQuestion = new Array();
        for (let i = 0; i < skillIds.length; ++i) {
            listSkillQuestion.push({
                questionId: questionNew.id,
                skillId: skillIds[i],
                isDeleted: 0,
            });
        }
        await skillQuestionService.createSkillQuestion(listSkillQuestion);
        if (questionNew && questionNew.option)
            questionNew.option = JSON.parse(questionNew.option);
        return res.json(questionNew);
    },

    putQuestion: async (req, res) => {
        const id = req.params.id;
        const question = {
            content: req.body.content,
            image: req.body.image || '',
            option: req.body.option && JSON.stringify(req.body.option),
            level: req.body.level || '',
            hint: req.body.hint || '',
            score: req.body.score,
            questionTypeId: req.body.questionTypeId,
            teacherId: req.body.teacherId,
        };
        let questionUpdated = await questionService.updateQuestion(
            id,
            question
        );
        const skillIds = req.body.skillIds || new Array();
        const listSkillQuestion = new Array();
        const listSkillQuestionUpdate = new Array();
        const listSkillQuestionExists = new Array();
        await skillQuestionService.findSkillByQuestion(id);
        const listSkillQuestionCurrent =
            await skillQuestionService.findSkillByQuestion(id);

        for (let i = 0; i < skillIds.length; i++) {
            if (
                listSkillQuestionCurrent.find(
                    (skillQuestionCurrent) =>
                        skillQuestionCurrent.skillId === skillIds[i]
                )
            ) {
                listSkillQuestionExists.push(skillIds[i]);
                continue;
            }
            listSkillQuestionUpdate.push(skillIds[i]);
        }

        for (let i = 0; i < listSkillQuestionCurrent.length; i++) {
            if (
                listSkillQuestionExists.includes(
                    listSkillQuestionCurrent[i].skillId
                )
            )
                continue;
            await skillQuestionService.deleteSkillQuestion(
                listSkillQuestionCurrent[i].id
            );
        }
        for (let i = 0; i < listSkillQuestionUpdate.length; ++i) {
            listSkillQuestion.push({
                questionId: questionUpdated.id,
                skillId: listSkillQuestionUpdate[i],
                isDeleted: 0,
            });
        }
        await skillQuestionService.createSkillQuestion(listSkillQuestion);
        if (questionUpdated && questionUpdated.option)
            questionUpdated.option = JSON.parse(questionUpdated.option);
        return res.json(questionUpdated);
    },

    deleteQuestion: async (req, res) => {
        let id = req.params.id;
        let questionDeleted = await questionService.deleteQuestion(id);
        return res.json(questionDeleted);
    },
};
