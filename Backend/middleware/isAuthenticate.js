import jwt from "jsonwebtoken";
import Auth from "../model/auth.model.js";

export const CheckIsAuthenticate = async (req, res, next) => {
    const isheader = req.headers.authorization;
    if (!isheader || !isheader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided" });
    }
    const token = isheader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const user = await Auth.findById(decoded.id).select("-password");
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token", error: error.message });
    }
};