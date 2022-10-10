const db = require('../models/index');

module.exports = {
    createAdmin: async (admin) => {
        try {
            let adminNew = await db.Admin.create(admin);
            return adminNew;
        } catch (e) {
            console.log(e);
            return e;
        }
    },
    findAdmin: async (id) => {
        try {
            let admin = await db.Admin.findByPk(id, {
                where: { isDeleted: 0 },
                attributes: {
                    exclude: ['isDeleted', 'createdAt', 'updatedAt'],
                },
                raw: true,
            });
            return admin;
        } catch (e) {
            console.log(e);
            return e;
        }
    },
    findAdminByAccount: async (accountId) => {
        try {
            let admin = await db.Admin.findOne({
                where: { accountId, isDeleted: 0 },
                attributes: {
                    exclude: [
                        'accountId',
                        'isDeleted',
                        'createdAt',
                        'updatedAt',
                    ],
                },
                raw: true,
            });
            return admin;
        } catch (e) {
            console.log(e);
            return e;
        }
    },
};
