import NotificationModel from "../models/applicationModel.js";

const createNotification = async (req, res) => {
    
        try {
            const newNotification = new NotificationModel(req.body);
            await newNotification.save();
            res.status(201).json({ message: "Müraciət uğurla göndərildi" });
        } catch (error) {
            res.status(500).json({ error: "Məlumatlar yadda saxlanmadı" });
        }
    };

    const deleteNotification = async (req, res) => {
        try {
            const { id } = req.params;
            
            await NotificationModel.findByIdAndDelete(id);

    
            res.json({ message: "Müraciət uğurla silindi" });
        } catch (error) {
            res.status(500).json({ error: "Müraciəti silmək mümkün olmadı" });
        }
    };


const getAllNotifications = async (req, res) => {
    try {
        const notifications = await NotificationModel.find();
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ error: "Müraciətləri gətirə bilmədik" });
    }
};

export { createNotification, getAllNotifications, deleteNotification };