import jwt from "jsonwebtoken"

export const generateToken = async(res, id)=>{
    const token =jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:"30d"
    })
    res.cookie("jwt",token,{
        httpOnly:true,
        secure:false,
        sameSite:"strict",
        maxAge:30*24*60*60*1000
    })
    res.json({ token });

} 