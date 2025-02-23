import express from "express";
import { createEvaluation, getEvaluationsByGroup, getEvaluationsForStudent, updateAttendance, updateEvaluation } from "../controller/evaluationController.js";
import { adminControl, adminOrTeacherControl, userControl } from "../middlewere/authMiddlewere.js";

const router = express.Router();

router.route("/create").post(adminOrTeacherControl,createEvaluation)
router.route("/score/update/:id").patch(adminOrTeacherControl,updateEvaluation)
router.route("/attendance/update/:id").patch(adminOrTeacherControl,updateAttendance)
router.route("/get/group/:group").get(adminOrTeacherControl, getEvaluationsByGroup)
router.route("/get/student/:id").get(userControl, getEvaluationsForStudent)



export default router; 
