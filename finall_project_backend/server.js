import express from "express"
import Dotenv from "dotenv"
import connectDB from "./config/config.js"
import UserRouter from "./router/userRouter.js"
import cookieParser from "cookie-parser"


Dotenv.config()

const PORT = process.env.PORT

connectDB()
const app = express()
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))

app.use(express.json())
app.use("/user", UserRouter)

app.listen(PORT,()=>{
    console.log(` Backend runing ${PORT}`)
})     