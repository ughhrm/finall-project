import UserModel from "../models/userModel.js";
import { generateToken } from "../utils/generateToken.js";

const createUser = async(req,res)=>{
    try {
        const { name , lastName, email, password, dateOfBirth, location, programmingLanguage } = req.body;

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

const loginUser =async(req,res)=>{
    const {email , password}=req.body
    const user = await UserModel.findOne({email})

    if(user&& await user.passwordControl(password)){
        generateToken(res ,user._id)
    }else{
        res.status(400).json({ message: "Şifrə və ya email yanlışdır" })
        console.log("sef")
    } 
} 

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
            programmingLanguage: req.user.programmingLanguage
        });
    }else{
        res.json("gelmir")
    }
}

export {createUser,loginUser, logoutUser, getProfile}    