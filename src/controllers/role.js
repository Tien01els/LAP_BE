const { roleService } = require('../services/index');

module.exports = {
    getAllRoles: async (req, res) => {
        let roles = await roleService.findAllRoles();
        // console.log(roles);
        return res.send(roles);
    },
};
