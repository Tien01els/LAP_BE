const db = require('../models/index');

module.exports = {
    findAllAccount: async () => {
        try {
            return await db.Account.findAll();
        } catch (e) {
            console.log(e);
            return e;
        }
    },
    findAccount: async (id) => {
        try {
            return await db.Account.findByPk(id, {
                attributes: {
                    exclude: ['createdAt', 'updatedAt'],
                },
                raw: true,
            });
        } catch (e) {
            console.log(e);
            return e;
        }
    },
    findAccountByEmail: async (email) => {
        try {
            let account = await db.Account.findOne({
                where: { email },
                attributes: {
                    exclude: ['createdAt', 'updatedAt'],
                },
                raw: true,
            });
            return account;
        } catch (e) {
            console.log(e);
            return e;
        }
    },
    findAccountByRefreshToken: async (refreshToken) => {
        try {
            let account = await db.Account.findOne({
                where: { refreshToken },
                attributes: {
                    exclude: ['createdAt', 'updatedAt'],
                },
                raw: true,
            });
            return account;
        } catch (e) {
            console.log(e);
            return e;
        }
    },
    createAccount: async (account) => {
        try {
            let accountNew = await db.Account.create(account);
            return accountNew;
        } catch (e) {
            console.log(e);
            return e;
        }
    },
    updateRefreshToken: async (id, refreshToken) => {
        try {
            let account = await db.Account.findByPk(id, {
                attributes: {
                    exclude: ['createdAt', 'updatedAt'],
                },
            });
            if (account) {
                account.refreshToken = refreshToken;
                return await account.save();
            }
            return account;
        } catch (e) {
            console.log(e);
            return e;
        }
    },
};
