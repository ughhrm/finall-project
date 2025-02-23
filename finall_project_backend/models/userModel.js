import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const UserSchema =mongoose.Schema({
    name: { type: String, required: true },  
    lastName: { type: String, required: true },   
    dateOfBirth: { type: Date, required: true },  
    location: { type: String, required: true },  
    programmingLanguage: { type: String, function() { return this.role === 'user' || this.role === 'teacher'; }}, 
    email: { type: String, required: true, unique: true }, 
    password: { type: String, required: true } ,
    role: {  type: String, required: true },
    group:{ type:String, function() { return this.role === 'user' }},

    

},{timestamps:true}) 

UserSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password , salt)
    next()
    
})             

UserSchema.methods.passwordControl=async function (password) {
    return await bcrypt.compare(password,this.password)
    
}
const UserModel = mongoose.model("User", UserSchema)

export default UserModel   