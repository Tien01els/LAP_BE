const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    const accessToken = authHeader && authHeader.split(' ')[1];

    if (!accessToken)
        return res
            .status(401)
            .json({ success: false, message: 'Unauthorized' });
    try {
        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        console.log(decoded);
        req.userId = decoded.userId;
        req.roleId = decoded.roleId;
        next();
    } catch (error) {
        console.log(error);
        return res.status(403).json({ success: false, message: 'Forbidden' });
    }
};

module.exports = verifyToken;
