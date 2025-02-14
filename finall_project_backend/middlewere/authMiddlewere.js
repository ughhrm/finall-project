import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";
import Dotenv  from "dotenv";

Dotenv.config()

const userControl = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Token tapılmadı" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await UserModel.findById(decoded.id).select("-password");

        if (!req.user) {
            return res.status(404).json({ message: "İstifadəçiaaa tapılmadı" });
        }

        next();
    } catch (error) {
        return res.status(401).json({ message: "Token etibarsızdır" });
    }
};

const adminControl = async (req, res, next) => {
    const token = req.cookies.jwt;

    if (!token) {
        return res.status(401).json({ message: "Giriş üçün icazəniz yoxdur" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const admin = await UserModel.findById(decoded.id).select("-password");

        if (!admin) {
            return res.status(404).json({ message: "Admin tapılmadı" });
        }

        if (admin.role !== "admin") {
            return res.status(403).json({ message: "Yalnız admin girişi mümkündür" });
        }

        req.user = admin; 
        next(); 
    } catch (error) {
        return res.status(401).json({ message: "Token etibarsızdır" });
    }
};


    
export {userControl, adminControl};
