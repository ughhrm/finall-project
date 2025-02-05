import UserModel from "../models/userModel.js";
import { generateToken } from "../utils/generateToken.js";

const createUser = async(req,res)=>{
    try {
        const {name, email , password}=req.body

    const user  = await UserModel.findOne({email})
    if (user) {
        res.json("user artiq var")

    }else{
        await UserModel.create({
            name:name,
            email:email,
            password:password
        })
        res.json("user create")
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
        res.json("logged in")
    }else{
        res.json("parol sefdir") 
    } 
}
const logoutUser = async(req,res)=>{
    res.cookie("jwt","",{
        httpOnly:true,
        expires:new Date (0)
    })
    res.json("logout")

}
const getProfile = async(req, res)=>{
    if(req.user){
        res.json({
            name:req.user.name,
            email:req.user.email,
            password:req.user.password
        })
    }else{
        res.json("adasd")
    }
}

export {createUser,loginUser, logoutUser, getProfile}   