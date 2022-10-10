const {
    questionService,
    skillQuestionService,
} = require('../services/index');

module.exports = {
    getQuestionOfAssignment: async (req, res) => {
        const assignmentId = req.params.assignmentId;
        const questions = await questionService.findQuestionByAssignmentId(
            assignmentId
        );

        for (let i = 0; i < questions.length; i++) {
            questions[i].option =
                questions[i].option && questions[i].option.split(',');
        }
        return res.send(questions);
    },
    getBankQuestionBaseOnGrade: async (req, res) => {
        const gradeId = req.params.gradeId;
        const questions = await questionService.findQuestionByGradeId(gradeId);
        const bankQuestion = new Array();

        for (let i = 0; i < questions.length; i++) {
            const questionInBank = bankQuestion.find(question => question.id === questions[i].id)
            console.log();
            if (!questionInBank) {
                bankQuestion.push(questions[i])
                continue
            }
        }   
        return res.json(questions);
    },

    postQuestion: async (req, res) => {
        const question = {
            content: req.body.content,
            image: req.body.image || '',
            option: req.body.option && JSON.stringify(req.body.option),
            level: req.body.level || '',
            hint: req.body.hint || '',
            score: req.body.score,
            questionTypeId: req.body.questionTypeId,
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
        };
        let questionUpdated = await questionService.updateQuestion(
            id,
            question
        );

        const skillIds = req.body.skillIds || new Array();
        const listSkillQuestion = new Array();
        for (let i = 0; i < skillIds.length; ++i) {
            listSkillQuestion.push({
                questionId: questionUpdated.id,
                skillId: skillIds[i],
                isDeleted: 0,
            });
        }
        await skillQuestionService.createSkillQuestion(listSkillQuestion);
        if (questionUpdated.option)
            questionUpdated.option = JSON.parse(questionUpdated.option);
        return res.json(questionUpdated);
    },

    deleteQuestion: async (req, res) => {
        let id = req.params.id;
        let questionDeleted = await questionService.deleteQuestion(id);
        return res.json(questionDeleted);
    },
};
