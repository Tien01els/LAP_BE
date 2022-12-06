const { questionService, skillQuestionService } = require('../services/index');

module.exports = {
    getQuestionBank: async (req, res) => {
        //query
        //grades -- topics -- skills

        const gradeId = req.query.gradeId;
        const topicId = req.query.topicId;
        const skillId = req.query.skillId;
        const level = req.query.level;
        const questions = await questionService.findQuestionBank(gradeId, topicId, skillId, level);
        const bankQuestion = new Array();

        for (let i = 0; i < questions.length; i++) {
            const questionInBank = bankQuestion.find((question) => question.id === questions[i].id);

            if (!questionInBank) {
                questions[i].option = questions[i].option && JSON.parse(questions[i].option);
                bankQuestion.push(questions[i]);
            }
        }
        return res.json(questions);
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
        try {
            const question = {
                content: req.body.content,
                image: req.body.image || '',
                option: req.body.option && JSON.stringify(req.body.option),
                level: req.body.level || '',
                hint: req.body.hint || '',
                score: req.body.score,
                questionTypeId: req.body.questionTypeId,
                teacherId: req.userId,
                isDeleted: false,
            };
            const skillIds = req.body.skillIds || new Array();
            let questionNew = await questionService.createQuestion(question, skillIds);
            const questionDetail = await questionService.findQuestionDetail(questionNew.id);
            return res.status(200).send(questionDetail);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            return res.status(errorStatus).send(error.data);
        }
    },

    putQuestion: async (req, res) => {
        try {
            const id = req.params.id;
            const teacherId = req.userId;
            const skillIds = req.body.skillIds;

            const question = {
                content: req.body.content,
                image: req.body.image || '',
                option: req.body.option && JSON.stringify(req.body.option),
                level: req.body.level || '',
                hint: req.body.hint || '',
                score: req.body.score,
                questionTypeId: req.body.questionTypeId,
            };
            const result = await questionService.updateQuestion(id, teacherId, question, skillIds);
            if (result.statusCode !== 204) return res.status(result.statusCode).send(result.data);
            const questionDetail = await questionService.findQuestionDetail(id);
            return res.status(200).send(questionDetail);
        } catch (error) {
            console.log(error);
            const errorStatus = error.statusCode || 500;
            return res.status(errorStatus).send(error.data);
        }
    },

    deleteQuestion: async (req, res) => {
        try {
            const id = req.params.id;
            const result = await questionService.deleteQuestion(id);
            return res.status(200).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            return res.status(errorStatus).send(error.data);
        }
    },
};
