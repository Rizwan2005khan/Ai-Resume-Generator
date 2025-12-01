import jwt from 'jsonwebtoken';

const protect = (req, res, next) => {
    // Get token from header
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: "No token provided, authorization denied" });
    }
    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token is not valid" });
    }
}

export default protect;