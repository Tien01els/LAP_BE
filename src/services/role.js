const db = require('../models/index');

module.exports = {
    findAllRoles: async () => {
        try {
            let roles = await db.Role.findAll({
                where: { isDeleted: 0 },
                raw: true,
            });
            return roles;
        } catch (e) {
            console.log(e);
        }
    },
};
