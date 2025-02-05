import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const UserSchema =mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true}
},{timestamps:true}) 

UserSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password , salt)
    next()
    
})

UserSchema.methods.passwordControl=async function (password) {
    return await bcrypt.compare(password,this.password)
    
}
const UserModel = mongoose.model("user", UserSchema)

export default UserModel  