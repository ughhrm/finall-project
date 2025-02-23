import express from 'express';
import {  createAdmin, createStudentandTeacherByAdmin , deleteUserByAdmin, getAllUsersByAdmin, getStudentsByClass, loginAdmin, logoutAdmin, updateUserByAdmin } from '../controller/adminController.js';
import { adminControl, adminOrTeacherControl } from '../middlewere/authMiddlewere.js';

const router = express.Router();

router.route("/signup").post(createAdmin)
router.route("/login").post(loginAdmin)
router.route("/logout").post(logoutAdmin)
router.route("/get-all-user").get(adminControl,getAllUsersByAdmin)
router.route("/cerate-user").post(adminControl,createStudentandTeacherByAdmin)
router.route("/update-user/:id").patch(adminControl,updateUserByAdmin)
router.route("/delete-user/:id").delete(adminControl,deleteUserByAdmin)
router.route("/students-by-class").get(adminOrTeacherControl,getStudentsByClass)

export default router; 
