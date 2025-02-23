import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    programmingLanguage: { type: String, required: true },
    skillLevel: { type: String, enum: ["Sıfır", "Başlanğıc", "Orta"], required: true },
    createdAt: { type: Date, default: Date.now }
  });
  
  const NotificationModel = mongoose.model("Notification", notificationSchema);

  export default NotificationModel
  