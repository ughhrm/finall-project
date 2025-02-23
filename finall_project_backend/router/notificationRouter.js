import express from "express";
import { createNotification, deleteNotification, getAllNotifications } from "../controller/notificationController.js";
import { adminControl } from "../middlewere/authMiddlewere.js";

const router = express.Router();


router.route("/send").post(createNotification)
router.route("/all-notifications").get(adminControl,getAllNotifications)
router.route("/delete/:id").delete(adminControl,deleteNotification)


export default router; 
 