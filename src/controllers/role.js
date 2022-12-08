const { roleService } = require('../services/index');

module.exports = {
    getAllRoles: async (req, res) => {
        try {
            let result = await roleService.findAllRoles();
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            return res.status(errorStatus).send(error.data);
        }
    },
    postRole: async (req, res) => {
        try {
            const role = {
                role: req.body.role,
                isDeleted: false,
            }
            let result = await roleService.createRole(role);
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            return res.status(errorStatus).send(error.data);
        }
    },
};
