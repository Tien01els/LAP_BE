const db = require('../models/index');
const { respMapper, errorResp } = require('../helper/helper');

module.exports = {
    createListAssignmentQuestion: async (listAssignmentQuestion) => {
        try {
            const listAssignmentQuestionNew =
                await db.Assignment_Question.bulkCreate(listAssignmentQuestion);
            return respMapper(200, listAssignmentQuestionNew);
        } catch (error) {
            if (error.stack) console.log(error.stack);
            throw errorResp(400, error.message);
        }
    },
    getQuestionByAssignment: async (assignmentId) => {
        try {
            const listAssignmentQuestionNew =
                await db.Assignment_Question.findAll({
                    where: { assignmentId, isDeleted: 0 },
                    attributes: {
                        exclude: ['isDeleted', 'createdAt', 'updatedAt'],
                    },
                    raw: true,
                });
            return respMapper(200, listAssignmentQuestionNew);
        } catch (error) {
            if (error.stack) console.log(error.stack);
            throw errorResp(400, error.message);
        }
    },
};
