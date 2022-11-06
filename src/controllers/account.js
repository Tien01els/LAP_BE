const { accountService } = require('../services/index');

module.exports = {
    createAccount: async (req, res) => {
        try {
            const account = {
                email: req.body.email,
                password: req.body.password,
                roleId: req.body.roleId,
            };
            const result = await accountService.createAccount(account);
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            return res.status(errorStatus).send(error.data);
        }
    },
    login: async (req, res) => {
        try {
            const result = await accountService.loginAccount(req.body.email, req.body.password);
            if (typeof result.data === 'string')
                return res.status(result.statusCode).json({
                    success: false,
                    message: result.data,
                });
            const tokens = result.data;
            return res
                .status(result.statusCode)
                .cookie('accessToken', tokens.accessToken, {
                    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
                    httpOnly: true,
                    secure: false,
                    path: '/',
                    sameSite: 'strict',
                })
                .cookie('refreshToken', tokens.refreshToken, {
                    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
                    httpOnly: true,
                    secure: false,
                    path: '/',
                    sameSite: 'strict',
                })
                .json({
                    success: true,
                    message: 'Login success',
                    // data: result.data,
                    // { ...user, roleId: account.roleId },
                });
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            return res.status(errorStatus).send(error.data);
        }
    },
    logout: async (req, res) => {
        try {
            const result = await accountService.logoutAccount(req.userId, req.roleId);
            return res.status(result.statusCode).json({
                success: true,
                message: 'Log out success',
            });
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            return res.status(errorStatus).send(error.data);
        }
    },

    requestRefreshToken: async (req, res) => {
        try {
            const refreshToken = req.cookies.refreshToken;
            const result = await accountService.refreshTokenForAccount(refreshToken);

            const tokens = result.data;
            return res
                .status(result.statusCode)
                .cookie('accessToken', tokens.accessToken, {
                    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
                    httpOnly: true,
                    secure: false,
                    path: '/',
                    sameSite: 'strict',
                })
                .cookie('refreshToken', tokens.refreshToken, {
                    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
                    httpOnly: true,
                    secure: false,
                    path: '/',
                    sameSite: 'strict',
                })
                .json({
                    success: true,
                    message: 'Refresh token success',
                    // data: result.data,
                    // { ...user, roleId: account.roleId },
                });
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            return res.status(errorStatus).send(error.data);
        }
    },

    getAllAccount: async (req, res) => {
        try {
            const result = await accountService.findAllAccount();
            return res.status(result.statusCode).send({
                success: true,
                message: 'Account',
                data: result.data,
            });
        } catch (error) {
            const errorStatus = error.statusCode || 500;
            return res.status(errorStatus).send(error.data);
        }
    },
};
