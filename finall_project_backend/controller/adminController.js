import Dotenv from "dotenv";
import UserModel from "../models/userModel.js";
import { generateToken } from "../utils/generateToken.js";
import validatePassword from "../utils/validate.js";
Dotenv.config()


const createAdmin = async (req, res) => {
    try {
        const { name, lastName, email, password, secretCode, dateOfBirth, location, } = req.body;
        const ADMIN_SECRET_SIGNUP = process.env.ADMIN_SECRET_SIGNUP;

        if (secretCode !== ADMIN_SECRET_SIGNUP) {
            return res.status(403).json({ message: "Gizli kod yanlışdır" });
        }



        const existingAdmin = await UserModel.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: "Zatən admin mövcuddur" });
        }

        if (!validatePassword(password)) {
            return res.status(400).json({
                message: "Şifrə zəifdir! Minimum 8 simvol, böyük hərf, kiçik hərf, rəqəm və xüsusi simvol olmalıdır."
            });
        }


        const admin = await UserModel.create({
            name,
            lastName,
            email,
            password,
            dateOfBirth,
            location,
            role: "admin"
        });

        res.status(201).json({ message: "Admin uğurla yaradıldı", admin });
    } catch (error) {
        console.log("createAdmin error", error);
        res.status(500).json({ message: "Server xətası" });
    }
};

const loginAdmin = async (req, res) => {
    try {
        const { email, password,secretCode } = req.body;

        const ADMIN_SECRET_LOGIN = process.env.ADMIN_SECRET_LOGIN;


        if (secretCode !== ADMIN_SECRET_LOGIN) {
            return res.status(403).json({ message: "Gizli kod yanlışdır" });
        }


        const admin = await UserModel.findOne({ email });
        if (!admin) {
            return res.status(404).json({ message: "Admin tapılmadı" });
        }


        if (admin.role !== "admin") {
            return res.status(403).json({ message: "Bu istifadəçi admin deyil" });
        }


        const isPasswordValid = await admin.passwordControl(password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Parol yanlışdır" });
        }


       const token=  generateToken(res, admin._id);
       return res.json({token})




    } catch (error) {
        console.log("adminLogin error", error);
        res.status(500).json({ message: "Server xətası" });
    }
};
const logoutAdmin = async (req, res) => {
    try {

        res.cookie("jwt", "", {
            httpOnly: true,
            expires: new Date(0),
        });


        res.json("Admin çıxış etdi");
        console.log("Admin logout oldu");
    } catch (error) {

        console.log("Admin logout error:", error);
        res.status(500).json({ message: "Logout zamanı xəta baş verdi" });
    }
};

const getAllUsersByAdmin = async (req, res) => {
    try {

        const users = await UserModel.find().select("-password");
        res.json( users );
    } catch (error) {
        console.log("getAllUsers error", error);
        res.status(500).json({ message: "Server xətası" });
    }
};

const createStudentandTeacherByAdmin = async (req, res) => {
    try {
        const { name, lastName, email, dateOfBirth, location, programmingLanguage, role,group } = req.body;

        


        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "İstifadəçi artıq mövcuddur" });
        }



        await UserModel.create({
            name,
            lastName,
            email,
            password:"Alpha123!",
            dateOfBirth,
            location,
            programmingLanguage,
            role,
            group
        });

        res.json({ message: "İstifadəçi uğurla yaradıldı" });

    } catch (error) {
        res.status(500).json({ message: "İstifadəçi əlavə edilərkən xəta baş verdi", error });
    }
};

const updateUserByAdmin = async (req, res) => {
    try {
        const { id } = req.params;

        const updatedUser = await UserModel.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!updatedUser) {
            return res.status(404).json({ message: "İstifadəçi tapılmadı" });
        }

        res.json({ message: "İstifadəçi məlumatları yeniləndi", updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Xəta baş verdi", error });
    }
};

const deleteUserByAdmin = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await UserModel.findById(id);
        if (!user) {
            return res.status(404).json({ message: "İstifadəçi tapılmadı" });
        }

        await UserModel.findByIdAndDelete(id);
        res.json({ message: "İstifadəçi silindi" });
    } catch (error) {
        res.status(500).json({ message: "İstifadəçi silinərkən xəta baş verdi", error });
    }
};

const getStudentsByClass = async (req, res) => {
    try {
        const students = await UserModel.find({ role: "user" });

        const groupedData = {};

        students.forEach(student => {
            if (student.group) {  
                if (!groupedData[student.group]) {
                    groupedData[student.group] = [];
                }
                groupedData[student.group].push(student);
            }
        });

        res.json(groupedData);
    } catch (error) {
        console.error("Xəta:", error);
        res.status(500).json({ message: "Xəta baş verdi!" });
    }
};

export { createAdmin, loginAdmin, logoutAdmin, getAllUsersByAdmin, createStudentandTeacherByAdmin, updateUserByAdmin, deleteUserByAdmin,getStudentsByClass } 