import express from "express"
import { createUser, getProfile, loginUser, logoutUser } from "../controller/userController.js"
import userControl from "../middlewere/authMiddlewere.js"

const router = express()

router.route("/singup").post(createUser)
router.route("/login").post(loginUser)
router.route("/logout").post(logoutUser)
router.route("/profile").get(userControl, getProfile)
export default router