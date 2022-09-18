const db = require('../models/index');

module.exports = {
    getAllRoles: async (req, res) => {
        try {
            let roles = await db.Role.findAll({
                raw: true,
            });
            return roles;
        } catch (e) {
            console.log(e);
        }
    },
};
