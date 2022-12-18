const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = require('../models/index');
const { respMapper, errorResp } = require('../helper/helper');

const generateToken = (payload) => {
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1d',
    });
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '7d',
    });
    return { accessToken, refreshToken };
};

const getUserByAccount = async (account) => {
    const accountId = account.id;
    if (account.roleId === 1)
        return await db.Admin.findOne({
            where: { accountId, isDeleted: 0 },
            attributes: {
                exclude: ['accountId', 'isDeleted', 'createdAt', 'updatedAt'],
            },
            raw: true,
        });
    if (account.roleId === 2)
        return await db.Teacher.findOne({
            where: { accountId },
            attributes: {
                exclude: ['accountId', 'isDeleted', 'createdAt', 'updatedAt'],
            },
            raw: true,
        });
    if (account.roleId === 3)
        return await db.Student.findOne({
            where: { accountId },
            attributes: {
                exclude: ['accountId', 'isDeleted', 'createdAt', 'updatedAt'],
            },
            raw: true,
        });
    if (account.roleId === 4)
        return await db.Parent.findOne({
            where: { accountId },
            attributes: {
                exclude: ['accountId', 'isDeleted', 'createdAt', 'updatedAt'],
            },
            raw: true,
        });
};

const getUserById = async (userId, roleId) => {
    if (roleId === 1)
        return await db.Admin.findByPk(userId, {
            where: { isDeleted: 0 },
            attributes: {
                exclude: ['isDeleted', 'createdAt', 'updatedAt'],
            },
            raw: true,
        });
    if (roleId === 2)
        return await db.Teacher.findByPk(userId, {
            where: { isDeleted: 0 },
            attributes: {
                exclude: ['isDeleted', 'createdAt', 'updatedAt'],
            },
            raw: true,
        });
    if (roleId === 3)
        return await db.Student.findByPk(userId, {
            where: { isDeleted: 0 },
            attributes: {
                exclude: ['isDeleted', 'createdAt', 'updatedAt'],
            },
            raw: true,
        });
    if (roleId === 4)
        return await db.Parent.findByPk(userId, {
            where: { isDeleted: 0 },
            attributes: {
                exclude: ['isDeleted', 'createdAt', 'updatedAt'],
            },
            raw: true,
        });
};

const updateRefreshToken = async (id, refreshToken) => {
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
};

module.exports = {
    createAccount: async (account) => {
        try {
            const isAccountExist = await db.Account.findOne({
                where: { email: account.email },
                attributes: {
                    exclude: ['createdAt', 'updatedAt'],
                },
                raw: true,
            });

            if (isAccountExist) return errorResp(409, 'Account has existed');

            const password = await bcrypt.hash(account.password, 10);
            const accountCreate = {
                email: account.email,
                password,
                avatarImg: account.avatarImg || null,
                roleId: account.roleId,
                isActive: true,
                isDeleted: false,
            };

            const accountNew = await db.Account.create(accountCreate);
            if (
                accountNew &&
                (typeof accountNew === 'object' || typeof accountNew === 'function')
            ) {
                let result;
                if (accountNew.roleId === 1) {
                    const admin = {
                        fullName: account.fullName || 'admin',
                        accountId: accountNew.id,
                        isDeleted: false,
                    };
                    result = await db.Admin.create(admin);
                }
                if (accountNew.roleId === 2) {
                    const teacher = {
                        fullName: account.fullName || 'teacher',
                        dateOfBirth: account.dateOfBirth || new Date(),
                        gender: account.gender || 0,
                        accountId: accountNew.id,
                        isDeleted: false,
                    };
                    result = await db.Teacher.create(teacher);
                }
                if (accountNew.roleId === 3) {
                    const student = {
                        fullName: account.fullName || 'student',
                        dateOfBirth: account.dateOfBirth || new Date(),
                        gender: account.gender || 0,
                        parentId: account.parentId || null,
                        classId: account.classId || null,
                        accountId: accountNew.id,
                        isDeleted: false,
                    };
                    result = await await db.Student.create(student);
                }
                if (accountNew.roleId === 4) {
                    const parent = {
                        fullName: account.fullName || 'parent',
                        accountId: accountNew.id,
                        isDeleted: false,
                    };
                    result = await db.Parent.create(parent);
                }
                if (result)
                    return respMapper(200, {
                        success: true,
                        message: 'Account created successfully',
                    });
            }
            return errorResp(500, 'Account created fail');
        } catch (error) {
            if (error.stack) {
                console.log(error.message);
                console.log(error.stack);
            }
            throw errorResp(400, error.message);
        }
    },
    loginAccount: async (email, password) => {
        try {
            const account = await db.Account.findOne({
                where: { email, isDeleted: false },
                attributes: {
                    exclude: ['createdAt', 'updatedAt'],
                },
                raw: true,
            });
            if (!account) return errorResp(400, 'Account not found');
            if (account.isActive === 0) return errorResp(400, 'Account is not active');

            const validPassword = await bcrypt.compare(password, account.password);
            if (!validPassword) return errorResp(400, 'Wrong password');
            let user = await getUserByAccount(account);
            if (!user) return errorResp(400, 'User not found');
            let userInfo = {};
            if (account.roleId === 3) {
                userInfo.classId = user.classId;
                userInfo.averageScore = user.averageScore;
                userInfo.parentId = user.parentId;
            }
            const payload = {
                accountId: account.id,
                userId: user.id,
                fullName: user.fullName,
                dateOfBirth: user.dateOfBirth,
                gender: user.gender,
                roleId: account.roleId,
                ...userInfo,
            };

            const tokens = generateToken(payload);
            await updateRefreshToken(account.id, tokens.refreshToken);
            return respMapper(200, tokens);
        } catch (error) {
            if (error.stack) {
                console.log(error.message);
                console.log(error.stack);
            }
            throw errorResp(400, error.message);
        }
    },
    logoutAccount: async (accountId) => {
        try {
            const account = await db.Account.findByPk(accountId, {
                attributes: {
                    exclude: ['createdAt', 'updatedAt'],
                },
                raw: true,
            });
            if (!account) return errorResp(400, 'Not found account');
            account && (await updateRefreshToken(account.id, null));
            return respMapper(204, 'Log out success');
        } catch (error) {
            if (error.stack) {
                console.log(error.message);
                console.log(error.stack);
            }
            throw errorResp(400, error.message);
        }
    },
    refreshTokenForAccount: async (refreshToken) => {
        try {
            if (!refreshToken) return errorResp(401, "You're not authenticated");
            const account = await db.Account.findOne({
                where: { refreshToken },
                attributes: {
                    exclude: ['createdAt', 'updatedAt'],
                },
                raw: true,
            });

            if (!account) return errorResp(403, 'The session has expired');
            if (account.isActive === 0) return errorResp(401, 'Account is not active');
            if (account.isDeleted === 1) return errorResp(401, 'Account has deleted');

            const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

            let userInfo = {};
            if (account.roleId === 3) {
                userInfo.classId = decoded.classId;
                userInfo.averageScore = decoded.averageScore;
                userInfo.parentId = decoded.parentId;
            }
            const payload = {
                accountId: account.id,
                roleId: account.roleId,
                userId: decoded.userId,
                fullName: decoded.fullName,
                dateOfBirth: decoded.dateOfBirth,
                gender: decoded.gender,
                ...userInfo,
            };

            const tokens = generateToken(payload);
            await updateRefreshToken(account.id, tokens.refreshToken);

            return respMapper(201, tokens);
        } catch (error) {
            if (error.stack) {
                console.log(error.message);
                console.log(error.stack);
            }
            throw errorResp(401, 'The session has expired');
        }
    },

    findAllAccount: async () => {
        try {
            const allAccount = await db.Account.findAll({
                attributes: { exclude: ['isDeleted', 'createdAt', 'updatedAt'] },
                where: { isDeleted: 0 },
                include: [
                    {
                        attributes: ['role'],
                        model: db.Role,
                        as: 'role',
                        where: { isDeleted: 0 },
                    },
                ],
            });
            return respMapper(200, allAccount);
        } catch (error) {
            if (error.stack) {
                console.log(error.message);
                console.log(error.stack);
            }
            throw errorResp(400, error.message);
        }
    },
    findProfile: async (userId, roleId) => {
        try {
            let result;
            if (roleId === 1) {
                result = await db.Admin.findByPk(userId, {
                    attributes: {
                        exclude: ['isDeleted', 'createdAt', 'updatedAt'],
                    },
                    include: [
                        {
                            attributes: ['email', 'avatarImg'],
                            model: db.Account,
                            as: 'account',
                            where: { isDeleted: 0 },
                            include: [
                                {
                                    attributes: ['role'],
                                    model: db.Role,
                                    as: 'role',
                                    where: { isDeleted: 0 },
                                },
                            ],
                        },
                    ],
                });
            }
            if (roleId === 2) {
                result = await db.Teacher.findByPk(userId, {
                    attributes: {
                        exclude: ['isDeleted', 'createdAt', 'updatedAt'],
                    },
                    include: [
                        {
                            attributes: ['email', 'avatarImg'],
                            model: db.Account,
                            as: 'account',
                            where: { isDeleted: 0 },
                            include: [
                                {
                                    attributes: ['role'],
                                    model: db.Role,
                                    as: 'role',
                                    where: { isDeleted: 0 },
                                },
                            ],
                        },
                    ],
                });
            }
            if (roleId === 3) {
                result = await await db.Student.findByPk(userId, {
                    attributes: {
                        exclude: ['isDeleted', 'createdAt', 'updatedAt'],
                    },
                    include: [
                        {
                            attributes: ['email', 'avatarImg'],
                            model: db.Account,
                            as: 'account',
                            where: { isDeleted: 0 },
                            include: [
                                {
                                    attributes: ['role'],
                                    model: db.Role,
                                    as: 'role',
                                    where: { isDeleted: 0 },
                                },
                            ],
                        },
                    ],
                });
            }
            if (roleId === 4) {
                result = await db.Parent.findByPk(userId, {
                    attributes: {
                        exclude: ['isDeleted', 'createdAt', 'updatedAt'],
                    },
                    include: [
                        {
                            attributes: ['email', 'avatarImg'],
                            model: db.Account,
                            as: 'account',
                            where: { isDeleted: 0 },
                            include: [
                                {
                                    attributes: ['role'],
                                    model: db.Role,
                                    as: 'role',
                                    where: { isDeleted: 0 },
                                },
                            ],
                        },
                    ],
                });
            }
            return respMapper(200, result);
        } catch (error) {
            if (error.stack) {
                console.log(error.message);
                console.log(error.stack);
            }
            throw errorResp(400, error.message);
        }
    },

    updateProfile: async (userId, roleId, profile) => {
        try {
            let result;
            if (roleId === 1) {
                result = await db.Admin.findByPk(userId, {
                    attributes: {
                        exclude: ['isDeleted', 'createdAt', 'updatedAt'],
                    },
                });
            }
            if (roleId === 2) {
                result = await db.Teacher.findByPk(userId, {
                    attributes: {
                        exclude: ['isDeleted', 'createdAt', 'updatedAt'],
                    },
                });
            }
            if (roleId === 3) {
                result = await await db.Student.findByPk(userId, {
                    attributes: {
                        exclude: ['isDeleted', 'createdAt', 'updatedAt'],
                    },
                });
            }
            if (roleId === 4) {
                result = await db.Parent.findByPk(userId, {
                    attributes: {
                        exclude: ['isDeleted', 'createdAt', 'updatedAt'],
                    },
                });
            }

            result.fullName = profile.fullName;
            result.dateOfBirth = profile.dateOfBirth;
            result.gender = profile.gender;
            await result.save();

            await db.Account.update(
                { avatarImg: profile.avatarImg },
                { where: { id: result.accountId, isDeleted: false } }
            );
            return respMapper(200, result);
        } catch (error) {
            if (error.stack) {
                console.log(error.message);
                console.log(error.stack);
            }
            throw errorResp(400, error.message);
        }
    },

    changeActiveAccount: async (id) => {
        try {
            const account = await db.Account.findByPk(id);
            account.isActive = !account.isActive;
            await account.save();
            return respMapper(200, 'Account change active successfully');
        } catch (error) {
            if (error.stack) {
                console.log(error.message);
                console.log(error.stack);
            }
            throw errorResp(400, error.message);
        }
    },
    deleteAccount: async (id) => {
        try {
            await db.Account.update({ isDeleted: true }, { where: { id: id, isDeleted: 0 } });
            return respMapper(200, 'Account deleted successfully');
        } catch (error) {
            if (error.stack) {
                console.log(error.message);
                console.log(error.stack);
            }
            throw errorResp(400, error.message);
        }
    },
};
