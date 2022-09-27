const { roleService } = require('../services/index');

module.exports = {
    getAllRoles: async (req, res) => {
        let roles = await roleService.findAllRoles();
        return res.send(roles);
    },
};
