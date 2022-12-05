const { parentService } = require('../services/index');

module.exports = {
    getStudentOfParent: async (req, res) => {
        try {
            const parentId = req.user
            const result = await parentService.findStudentOfParent(parentId);
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            return res.status(errorStatus).send(error.data);
        }
    },
};
