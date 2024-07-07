const jwt = require('jsonwebtoken');

// Secret key for JWT, store this securely
const JWT_SECRET = process.env.TOKEN_SECRET;

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({
            status: 'faile',
            message: 'No token provided'
        });
    }
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(500).json({
                status: 'faile',
                message: 'Failed to authenticate token'
            });
        }
        req.userId = decoded.userId;
        console.log(req.userId,'token')
        next();
    });
}

module.exports = { verifyToken };