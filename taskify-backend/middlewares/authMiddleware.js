// middlewares/auth.js
import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;
    console.log(token);
    if (!token) return res.status(401).json({ message: "Access denied. No token provided." });

    try {
        const decoded = jwt.verify(token, "Your _jwt_ secret");
        console.log(decoded);

        req.userId = decoded.id;
        next();
    } catch (err) {
        res.status(400).json({ message: "Invalid token" });
    }
};
