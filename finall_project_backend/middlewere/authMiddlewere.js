import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";

const userControl = async (req, res, next) => {
    let token = req.cookies?.jwt;

    if (!token) {
        return res.status(401).json({ message: "Token tapılmadı" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await UserModel.findById(decoded.id).select("-password");

        if (!req.user) {
            return res.status(404).json({ message: "İstifadəçi tapılmadı" });
        }

        next();
    } catch (error) {
        return res.status(401).json({ message: "Token etibarsızdır" });
    }
};

export default userControl;
