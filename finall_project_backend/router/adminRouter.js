import express from 'express';
import {  createAdmin, createUserByAdmin, deleteUserByAdmin, getAllUsersByAdmin, loginAdmin, logoutAdmin, updateUserByAdmin } from '../controller/adminController.js';
import { adminControl } from '../middlewere/authMiddlewere.js';

const router = express.Router();

router.route("/signup").post(createAdmin)
router.route("/login").post(loginAdmin)
router.route("/logout").post(logoutAdmin)
router.route("/get-all-user").get(adminControl,getAllUsersByAdmin)
router.route("/cerate-user").post(adminControl,createUserByAdmin)
router.route("/update-user/:id").patch(adminControl,updateUserByAdmin)
router.route("/delete-user/:id").delete(adminControl,deleteUserByAdmin)

export default router; 
