const { questionService, skillQuestionService } = require('../services/index');

module.exports = {
    postQuestion: async (req, res) => {
        const question = {
            content: req.body.content,
            image: req.body.image,
            option: req.body.option,
            result: req.body.result,
            hint: req.body.hint,
            score: req.body.score,
            questionTypeId: req.body.questionTypeId,
            assignmentId: req.body.assignmentId,
            isDeleted: 0,
        };
        let questionNew = await questionService.createQuestion(question);

        const skillIds = req.body.skillIds;
        const listSkillQuestion = new Array();
        for (let i = 0; i < skillIds.length; ++i) {
            listSkillQuestion.push({
                questionId: questionNew.id,
                skillId: skillIds[i],
                isDeleted: 0,
            });
        }
        const skillQuestion = await skillQuestionService.createSkillQuestion(
            listSkillQuestion
        );

        console.log(skillQuestion);

        return res.send(questionNew);
    },
    getQuestionOfAssignment: async (req, res) => {
        let assignmentId = req.params.assignmentId;
        let questions = await questionService.findQuestionByAssignmentId(
            assignmentId
        );
        return res.send(questions);
    },
};
