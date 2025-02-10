const jwt = require('jsonwebtoken');

exports.authMiddleware = async (req, res, next) => {
    const token = req.cookies['auth_token'];

    if (!token) {
        return next();
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedToken;
        next();
    } catch (err) {
        res.clearCookie('auth_token');
        req.user = null;
        next();
    }
};

exports.isAuth = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized access.' });
    }
    next();
};

exports.isGuest = (req, res, next) => {
    if (req.user) {
        return res.status(403).json({ message: 'Already logged in.' });
    }
    next();
};
