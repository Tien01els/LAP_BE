const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    // const auth = req.header('Authorization');
    const { accessToken } = req.cookies;
    if (!accessToken)
        return res.status(401).json({ success: false, message: "You're not authenticated" });
    try {
        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        req.userId = decoded.userId;
        req.roleId = decoded.roleId;
        next();
    } catch (error) {
        return res.status(403).json({ success: false, message: 'The session has expired' });
    }
};

module.exports = verifyToken;
