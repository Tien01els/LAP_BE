const db = require('../models/index');
const { respMapper, errorResp } = require('../helper/helper');

module.exports = {
    createSkillQuestion: async (skillQuestion) => {
        try {
            let skillQuestionNew = await db.Skill_Question.bulkCreate(skillQuestion);
            return skillQuestionNew;
        } catch (e) {
            console.log(e);
        }
    },
};
