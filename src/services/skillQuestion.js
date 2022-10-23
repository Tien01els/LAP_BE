const db = require('../models/index');
const { respMapper, errorResp } = require('../helper/helper');

module.exports = {
    findSkillByQuestion: async (questionId) => {
        try {
            let skillQuestionNew = await db.Skill_Question.findAll({
                where: { questionId, isDeleted: 0 },
                attributes: {
                    exclude: [
                        'accountId',
                        'isDeleted',
                        'createdAt',
                        'updatedAt',
                    ],
                },
                raw: true,
            });
            return skillQuestionNew;
        } catch (e) {
            console.log(e);
        }
    },
    createSkillQuestion: async (skillQuestion) => {
        try {
            let skillQuestionNew = await db.Skill_Question.bulkCreate(
                skillQuestion
            );
            return skillQuestionNew;
        } catch (e) {
            console.log(e);
        }
    },
    deleteSkillQuestion: async (id) => {
        try {
            let skillQuestion = await db.Skill_Question.findByPk(id);
            if (skillQuestion) {
                skillQuestion.isDeleted = true;
                return respMapper(201, await skillQuestion.save());
            }
            throw errorResp(400, 'This skill of question does not exist');
        } catch (error) {
            if (error.stack) console.log(error.stack);
            throw errorResp(400, error.message);
        }
    },
};
