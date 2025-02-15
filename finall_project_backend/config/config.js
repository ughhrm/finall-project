import Dotenv  from "dotenv";
import mongoose from "mongoose";
Dotenv.config()

const connectDB = async(req,res)=>{

    try {
        const connect = await mongoose.connect(process.env.MONGO_URL)
        console.log("HOOST",connect.connection.host)
        
    } catch (error) {
        console.log("xeta bas verdi!! " ,error)
        
    }

}
export default connectDB