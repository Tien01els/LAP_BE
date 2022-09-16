const db = require('../models/index');

module.exports = {
    getAllRoles: async (req, res) => {
        try {
            let allRoles = await db.Roles.findAll();
            return allRoles;
        } catch (e) {
            console.log(e);
        }
    },
};
