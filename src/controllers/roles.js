const { rolesService } = require('../services/index');

module.exports = {
    getAllRoles: async (req, res) => {
        let allRoles = await rolesService();
        return res.send('Get all the roles');
    },
};
