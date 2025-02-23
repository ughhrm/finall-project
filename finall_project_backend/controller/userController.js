import UserModel from "../models/userModel.js";
import { generateToken } from "../utils/generateToken.js";
import validatePassword from "../utils/validate.js";

const createUser = async(req,res)=>{
    try {
        const { name , lastName, email, password, dateOfBirth, location, programmingLanguage } = req.body;


        if (!validatePassword(password)) {
            return res.status(400).json({
                message: "Şifrə zəifdir! Minimum 8 simvol, böyük hərf, kiçik hərf, rəqəm və xüsusi simvol olmalıdır."
            });
        }
    
    const user  = await UserModel.findOne({email})
    if (user) {
        return res.status(400).json({ message: "İstifadəçi artıq mövcuddur" });

    }else{
        await UserModel.create({
            name,
            lastName,
            email,
            password,
            dateOfBirth,
            location,
            programmingLanguage
        })
        res.json("user")   
    }
   
         
    } catch (error) {
        console.log(" createUser error", error)
        
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });

        if (!user || !(await user.passwordControl(password))) {
            console.log("Səhv giriş cəhdi");
            return res.status(400).json({ message: "Şifrə və ya email yanlışdır" });
        }

        const token = generateToken(res, user._id);

    
        return res.json({
            token,
            user: {
                id: user._id,
                role: user.role,
            },
        });

    } catch (error) {
        console.error("Login xətası:", error);
        return res.status(500).json({ message: "Daxili server xətası" });
    }
};



const logoutUser = async(req,res)=>{
    res.cookie("jwt","",{
        httpOnly:true,
        expires:new Date (0)
    })
    res.json("logout")
    console.log("logout")

}
const getProfile = async(req, res)=>{
    if(req.user){
        res.json({
            name: req.user.name,
            lastName: req.user.lastName,
            email: req.user.email,
            dateOfBirth: req.user.dateOfBirth,
            location: req.user.location,
            programmingLanguage: req.user.programmingLanguage,
            group: req.user.group,
            _id:req.user._id
        });
    }else{
        res.json("gelmir")
    }
}

 const changePassword = async (req, res) => {
    try {
        const { email, oldPassword, newPassword } = req.body;

        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "İstifadəçi tapılmadı" });
        }

        const isMatch = await user.passwordControl(oldPassword);
        if (!isMatch) {
            return res.status(400).json({ message: "Köhnə parol düzgün deyil" });
        }

        user.password = newPassword;
        await user.save();

        res.json({ message: "Parol uğurla dəyişdirildi" });
    } catch (error) {
        res.status(500).json({ message: "Server xətası" });
    }
};

export {createUser,loginUser, logoutUser, getProfile, changePassword}    