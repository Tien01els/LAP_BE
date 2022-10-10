const db = require('../models/index');

module.exports = {
    createParent: async (parent) => {
        try {
            let parentNew = await db.Parent.create(parent);
            return parentNew;
        } catch (e) {
            console.log(e);
            return e;
        }
    },
    findParent: async (id) => {
        try {
            let parent = await db.Parent.findByPk(id, {
                where: { isDeleted: 0 },
                attributes: {
                    exclude: ['isDeleted', 'createdAt', 'updatedAt'],
                },
                raw: true,
            });
            return parent;
        } catch (e) {
            console.log(e);
            return e;
        }
    },
    findParentByAccount: async (accountId) => {
        try {
            let parent = await db.Parent.findOne({
                where: { accountId },
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
            return parent;
        } catch (e) {
            console.log(e);
            return e;
        }
    },
};
