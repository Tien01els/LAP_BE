const { standardService } = require('../services/index');

module.exports = {
    getAllStandards: async (req, res) => {
        try {
            const result = await standardService.findAllStandards();
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            console.log(error);
            return res.status(errorStatus).send(error.data);
        }
    },
};
