const {
    accountService,
    adminService,
    teacherService,
    studentService,
    parentService,
} = require('../services/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (paloay) => {
    const accessToken = jwt.sign(paloay, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1d',
    });
    const refreshToken = jwt.sign(paloay, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '7d',
    });
    return { accessToken, refreshToken };
};

const getUserByAccount = async (account) => {
    if (account.roleId === 1)
        return await adminService.findAdminByAccount(account.id);
    if (account.roleId === 2)
        return await teacherService.findTeacherByAccount(account.id);
    if (account.roleId === 3)
        return await studentService.findStudentByAccount(account.id);
    if (account.roleId === 4)
        return await parentService.findParentByAccount(account.id);
};

const getUserById = async (userId, roleId) => {
    if (roleId === 1) return await adminService.findAdmin(userId);
    if (roleId === 2) return await teacherService.findTeacher(userId);
    if (roleId === 3) return await studentService.findStudent(userId);
    if (roleId === 4) return await parentService.findParent(userId);
};

module.exports = {
    register: async (req, res) => {
        const isAccountExist = await accountService.findAccountByEmail(
            req.body.email
        );
        if (isAccountExist)
            return res
                .status(500)
                .json({ success: false, message: 'Account existed' });

        const password = await bcrypt.hash(req.body.password, 10);
        const account = {
            email: req.body.email,
            password,
            roleId: req.body.roleId,
            isActive: true,
            isDeleted: false,
        };

        const accountNew = await accountService.createAccount(account);
        if (
            accountNew &&
            (typeof accountNew === 'object' || typeof accountNew === 'function')
        ) {
            let result;
            if (accountNew.roleId === 1) {
                const admin = {
                    fullName: req.body.fullName || 'admin',
                    accountId: accountNew.id,
                    isDeleted: false,
                };
                result = await adminService.createAdmin(admin);
            }
            if (accountNew.roleId === 2) {
                const teacher = {
                    fullName: req.body.fullName || 'teacher',
                    dateOfBirth: req.body.dateOfBirth || new Date(),
                    gender: req.body.gender || 0,
                    avatarImg: req.body.avatarImg || null,
                    accountId: accountNew.id,
                    isDeleted: false,
                };
                result = await teacherService.createTeacher(teacher);
            }
            if (accountNew.roleId === 3) {
                const student = {
                    fullName: req.body.fullName || 'student',
                    dateOfBirth: req.body.dateOfBirth || new Date(),
                    gender: req.body.gender || 0,
                    avatarImg: req.body.avatarImg || null,
                    accountId: accountNew.id,
                    parentId: req.body.parentId || null,
                    classId: req.body.classId || null,
                    isDeleted: false,
                };
                result = await studentService.createStudent(student);
            }
            if (accountNew.roleId === 4) {
                const parent = {
                    fullName: req.body.fullName || 'parent',
                    accountId: accountNew.id,
                    isDeleted: false,
                };
                result = await parentService.createParent(parent);
            }
            if (result)
                return res
                    .status(200)
                    .json({ success: true, message: 'Register success' });
        }

        return res
            .status(500)
            .json({ success: true, message: 'Register failed' });
    },
    login: async (req, res) => {
        const account = await accountService.findAccountByEmail(req.body.email);
        if (!account)
            return res
                .status(401)
                .json({ success: false, message: 'Account not found' });
        if (account.isActive === 0)
            return res
                .status(401)
                .json({ success: false, message: 'Account is not active' });
        if (account.isDeleted === 1)
            return res
                .status(401)
                .json({ success: false, message: 'Account is deleted' });
        const validPassword = await bcrypt.compare(
            req.body.password,
            account.password
        );
        if (validPassword) {
            let user = await getUserByAccount(account);
            if (!user)
                return res
                    .status(500)
                    .json({ success: false, message: 'Role not found' });

            const valueToken = {
                userId: user.id,
                roleId: account.roleId,
            };

            const tokens = generateToken(valueToken);

            await accountService.updateRefreshToken(
                account.id,
                tokens.refreshToken
            );
            return res.status(200).json({
                success: true,
                message: 'Login success',
                data: tokens,
                // { ...user, roleId: account.roleId },
            });
        }
        return res
            .status(500)
            .json({ success: false, message: 'Wrong password' });
    },
    logout: async (req, res) => {
        const user = await getUserById(req.userId, req.roleId);
        if (!user)
            return res
                .status(401)
                .json({ success: false, message: 'User not found' });
        const account = await accountService.findAccount(user.accountId);
        await accountService.updateRefreshToken(account.id, null);
        return res
            .status(204)
            .json({ success: true, message: 'Log out success' });
    },

    token: async (req, res) => {
        const refreshToken = req.body.refreshToken;
        if (!refreshToken)
            return res
                .status(401)
                .json({ success: false, message: 'Unauthorized' });
        const account = await accountService.findAccountByRefreshToken(
            refreshToken
        );
        if (!account)
            return res
                .status(403)
                .json({ success: false, message: 'Forbidden' });
        if (account.isActive === 0)
            return res
                .status(401)
                .json({ success: false, message: 'Account is not active' });
        if (account.isDeleted === 1)
            return res
                .status(401)
                .json({ success: false, message: 'Account is deleted' });

        try {
            const decoded = jwt.verify(
                refreshToken,
                process.env.REFRESH_TOKEN_SECRET
            );
            const valueToken = {
                userId: decoded.userId,
                roleId: decoded.roleId,
            };
            const tokens = generateToken(valueToken);
            await accountService.updateRefreshToken(
                account.id,
                tokens.refreshToken
            );

            return res.status(201).json({
                success: true,
                message: 'Refresh token success',
                data: tokens,
            });
        } catch (error) {
            console.log(error);
            return res
                .status(403)
                .json({ success: false, message: 'Forbidden' });
        }
    },

    getAllAccount: async (req, res) => {
        return res.status(200).json({
            success: true,
            message: 'Account',
            data: await accountService.findAllAccount(),
        });
    },
};
