import express from "express"
import { createTeacher } from "../controller/teacherController.js"

const router = express()

router.route("/signup").post(createTeacher)


export default router