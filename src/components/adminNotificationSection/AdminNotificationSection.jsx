import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllNotifications } from "../redux/notificationSlice";

const AdminNotificationSection = () => {
    const dispatch = useDispatch();
    const { notifications, loading, error } = useSelector((state) => state.notifications);

    useEffect(() => {
        dispatch(getAllNotifications());
    }, [dispatch]);

    return (
        <div className="p-5">
            <h2 className="text-2xl font-bold mb-4">Bildirişlər</h2>
            {loading && <p>Yüklənir...</p>}
            {error && <p className="text-red-500">{error}</p>}
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="border p-2">Ad</th>
                            <th className="border p-2">Soyad</th>
                            <th className="border p-2">Telefon</th>
                            <th className="border p-2">Email</th>
                            <th className="border p-2">Proqramlaşdırma Dili</th>
                            <th className="border p-2">Səviyyə</th>
                            <th className="border p-2">Tarix</th>
                        </tr>
                    </thead>
                    <tbody>
                        {notifications.map((notif) => (
                            <tr key={notif._id} className="hover:bg-gray-100">
                                <td className="border p-2">{notif.name}</td>
                                <td className="border p-2">{notif.lastName}</td>
                                <td className="border p-2">{notif.phone}</td>
                                <td className="border p-2">{notif.email}</td>
                                <td className="border p-2">{notif.programmingLanguage}</td>
                                <td className="border p-2">{notif.skillLevel}</td>
                                <td className="border p-2">{new Date(notif.createdAt).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminNotificationSection;
