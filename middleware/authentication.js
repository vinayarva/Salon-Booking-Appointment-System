const jwt = require('jsonwebtoken');


module.exports.Authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "Access Denied. No token provided or incorrect format." });
    }

    // Extract the token after "Bearer"
    const token = authHeader.split(' ')[1];

    try {
        const key = "private"; // Replace this with your secure key management system in production
        const decoded = jwt.verify(token, key);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid token." });
    }
};
