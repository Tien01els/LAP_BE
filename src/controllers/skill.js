const { skillService } = require('../services/index');

module.exports = {
    getSkillOfTopic: async (req, res) => {
        try {
            const result = await skillService.findSkillByTopic(
                req.params.topicId
            );
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            return res.status(errorStatus).send(error.data);
        }
    },
    getSkill: async (req, res) => {
        try {
            const result = await skillService.findSkill(req.params.id);
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            return res.status(errorStatus).send(error.data);
        }
    },
    getAllSkills: async (req, res) => {
        try {
            const result = await skillService.findAllSkills();
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            return res.status(errorStatus).send(error.data);
        }
    },
    postSkill: async (req, res) => {
        try {
            const skill = {
                skillName: req.body.skillName,
                description: req.body.description,
                topicId: req.body.topicId,
                standardId: req.body.standardId,
                isDeleted: false,
            };
            const result = await skillService.createSkill(skill);
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            return res.status(errorStatus).send(error.data);
        }
    },
    deleteSkill: async (req, res) => {
        try {
            const result = await skillService.deleteSkill(req.params.id);
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            return res.status(errorStatus).send(error.data);
        }
    },
};
