const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    // const auth = req.headers('Authorization');
    const token = req.headers.authorization;
    if (token) {
        const accessToken = token.split(' ')[1];
        try {
            const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
            req.userId = decoded.userId;
            req.roleId = decoded.roleId;
            return next();
        } catch (error) {
            return res.status(403).json({ success: false, message: 'The session has expired' });
        }
    }
    return res.status(401).json({ success: false, message: "You're not authenticated" });
};

module.exports = verifyToken;
