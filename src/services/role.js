const db = require('../models/index');

module.exports = {
    findAllRoles: async () => {
        try {
            let roles = await db.Role.findAll({
                where: { isDeleted: 0 },
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                raw: true,
            });
            return roles;
        } catch (e) {
            console.log(e);
        }
    },
};
