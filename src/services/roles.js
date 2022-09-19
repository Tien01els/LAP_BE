const db = require('../models/index');

module.exports = {
    findAllRoles: async (req, res) => {
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
