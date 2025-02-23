import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./AdminNotifications.module.scss"; // SCSS modulu import edilir
import { getAllNotifications, deleteNotification } from "../../redux/slice/notificationSlice";

const AdminNotifications = () => {
  const dispatch = useDispatch();
  const { notifications, loading, error } = useSelector((state) => state.notifications);

  useEffect(() => {
    dispatch(getAllNotifications());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Bu müraciəti silmək istədiyinizə əminsiniz?")) {
      dispatch(deleteNotification(id));
    }
  };

  return (
    <div className={styles["admin-notifications"]}>
      <h2>Müraciətlər</h2>
      {loading && <p>Yüklənir...</p>}
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles["notifications-list"]}>
        {notifications.map((notification) => (
          <div key={notification._id} className={styles["notification-card"]}>
            <h3>{notification.name} {notification.lastName}</h3>
            <p><strong>Email:</strong> {notification.email}</p>
            <p><strong>Telefon:</strong> {notification.phone}</p>
            <p><strong>Proqramlaşdırma dili:</strong> {notification.programmingLanguage}</p>
            <p><strong>Bilik səviyyəsi:</strong> {notification.skillLevel}</p>
            <p><strong>Tarix:</strong> {new Date(notification.createdAt).toLocaleDateString()}</p>
            <button className={styles["delete-btn"]} onClick={() => handleDelete(notification._id)}>Sil</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminNotifications;
