const { rolesService } = require('../services/index');

module.exports = {
    getAllRoles: async (req, res) => {
        let roles = await rolesService.getAllRoles();
        // console.log(roles);
        return res.send(roles);
    },
};
