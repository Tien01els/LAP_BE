const db = require('../models/index');
const { respMapper, errorResp } = require('../helper/helper');

module.exports = {
    findAllQuestionTypes: async () => {
        try {
            let questionTypes = await db.Questiontype.findAll({
                where: { isDeleted: 0 },
                attributes: { exclude: ['isDeleted', 'createdAt', 'updatedAt'] },
                raw: true,
            });
            return respMapper(200, questionTypes);
        } catch (error) {
            if (error.stack) {
                console.log(error.message);
                console.log(error.stack);
            }
            throw errorResp(400, error.message);
        }
    },
    createQuestionType: async (questionType) => {
        try {
            await db.Questiontype.create(questionType);
            return respMapper(201, 'QuestionType created successfully');
        } catch (error) {
            if (error.stack) {
                console.log(error.message);
                console.log(error.stack);
            }
            throw errorResp(400, error.message);
        }
    },
    deleteQuestionType: async (id) => {
        try {
            await db.Questiontype.update({ isDeleted: true }, { where: { id, isDeleted: false } });
            return respMapper(201, 'QuestionType deleted successfully');
        } catch (error) {
            if (error.stack) {
                console.log(error.message);
                console.log(error.stack);
            }
            throw errorResp(400, error.message);
        }
    },
};
