import UserModel from "../models/userModel.js";

const createTeacher = async (req, res) => {
    try {
        const { name, lastName, email, password, dateOfBirth, location, programmingLanguage } = req.body;

        const existingTeacher = await UserModel.findOne({ email });
        if (existingTeacher) {
            return res.status(400).json({ message: "Bu email ilə artıq bir müəllim qeydiyyatdan keçib" });
        }

        const newTeacher = await UserModel.create({
            name,
            lastName,
            email,
            password,  
            dateOfBirth,
            location,
            programmingLanguage,
            role: "teacher"  
        });

        res.status(201).json({ message: "Müəllim uğurla yaradıldı", teacher: newTeacher });
    } catch (error) {
        console.log("createTeacher error", error);
        res.status(500).json({ message: "Server xətası" });
    }
};
export  {createTeacher}