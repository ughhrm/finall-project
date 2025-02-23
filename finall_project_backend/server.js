import express from "express"
import Dotenv from "dotenv"
import connectDB from "./config/config.js"
import UserRouter from "./router/userRouter.js"
import AdminRouter from "./router/adminRouter.js"
import EvaluationRouter from "./router/evaluationRouter.js"
import NotificationRouter from "./router/notificationRouter.js"
import cookieParser from "cookie-parser"
import cors from "cors"

Dotenv.config()

const PORT = process.env.PORT

connectDB()
const app = express()

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(express.json()) 

app.use("/user", UserRouter)
app.use("/admin", AdminRouter)
app.use("/evaluations", EvaluationRouter);
app.use("/notification", NotificationRouter);


app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`)
})
