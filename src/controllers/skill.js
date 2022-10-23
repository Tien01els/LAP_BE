const { skillService } = require('../services/index');

module.exports = {
    getSkillOfTopic: async (req, res) => {
        try {
            let result = await skillService.findSkillByTopic(
                req.params.topicId
            );
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            return res.status(errorStatus).send(error.data);
        }
    },
    getAllSkills: async (req, res) => {
        try {
            let result = await skillService.findAllSkills();
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            return res.status(errorStatus).send(error.data);
        }
    },
};
