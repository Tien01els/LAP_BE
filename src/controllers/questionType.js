const { questionTypeService } = require('../services/index');

module.exports = {
    getAllQuestionTypes: async (req, res) => {
        try {
            let result = await questionTypeService.findAllQuestionTypes();
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            console.log(error);
            return res.status(errorStatus).send(error.data);
        }
    },
    postQuestionType: async (req, res) => {
        try {
            const questionType = {
                typeName: req.body.typeName,
                isDeleted: false,
            };
            let result = await questionTypeService.createQuestionType(questionType);
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            console.log(error);
            return res.status(errorStatus).send(error.data);
        }
    },
    deleteQuestionType: async (req, res) => {
        try {
            const id = req.params.id;
            let result = await questionTypeService.deleteQuestionType(id);
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            console.log(error);
            return res.status(errorStatus).send(error.data);
        }
    },
};
