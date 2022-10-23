const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    // const auth = req.header('Authorization');
    const { accessToken } = req.cookies;
    if (!accessToken)
        return res
            .status(401)
            .json({ success: false, message: 'Unauthorized' });
    try {
        const decoded = jwt.verify(
            accessToken,
            process.env.ACCESS_TOKEN_SECRET
        );
        req.userId = decoded.userId;
        req.roleId = decoded.roleId;
        next();
    } catch (error) {
        console.log(error);
        return res.status(403).json({ success: false, message: 'Forbidden' });
    }
};

module.exports = verifyToken;
