import express from "express"
import { changePassword, createUser, getProfile, loginUser, logoutUser } from "../controller/userController.js"
import { userControl } from "../middlewere/authMiddlewere.js"
import { getStudentsByClass } from "../controller/adminController.js"
import { getEvaluationsByGroup } from "../controller/evaluationController.js"

const router = express()

router.route("/singup").post(createUser)
router.route("/login").post(loginUser)
router.route("/logout").post(logoutUser)
router.route("/change-password").put(changePassword)
router.route("/profile").get(userControl, getProfile)
router.route("/students-by-class").get(userControl,getStudentsByClass)
router.route("/get/group/:group").get(userControl,getEvaluationsByGroup)




export default router