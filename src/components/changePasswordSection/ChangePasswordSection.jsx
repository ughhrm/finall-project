import { useState } from "react";
import styles from "./ChangePasswordSection.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../redux/slice/userAuthSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ChangePasswordSection = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, successMessage } = useSelector((state) => state.userAuth);

    const [email, setEmail] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(changePassword({ email, oldPassword, newPassword })).then((action) => {
            if (changePassword.fulfilled.match(action)) {
                setEmail("");
                setOldPassword("");
                setNewPassword("");
                navigate("/login");
            }
        });
    };

    return (
        <div className={`${styles.section} column`}>
            <div className={`${styles.content} column-bet`}>
                <form className={`${styles.form} column-bet`} onSubmit={handleSubmit}>
                    <h4>Parol Dəyiş</h4>

                    {error && <p className={styles.error} style={{ color: "red" }}>{error}</p>}
                    {successMessage && <p className={styles.success} style={{ color: "green" }}>{successMessage}</p>}

                    <div className={`${styles.inputBox} column`}>
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Cavabınız"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                        />
                    </div>

                    <div className={`${styles.inputBox} column`}>
                        <label htmlFor="oldPassword">Köhnə Parol</label>
                        <div className={`${styles.passwordInputBox} row-bet`}>
                            <input
                                id="oldPassword"
                                name="oldPassword"
                                type={showOldPassword ? "text" : "password"}
                                placeholder="Cavabınız"
                                onChange={(e) => setOldPassword(e.target.value)}
                                value={oldPassword}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowOldPassword(!showOldPassword)}
                            >
                                {showOldPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    <div className={`${styles.inputBox} column`}>
                        <label htmlFor="newPassword">Yeni Parol</label>
                        <div className={`${styles.passwordInputBox} row-bet`}>
                            <input
                                id="newPassword"
                                name="newPassword"
                                type={showNewPassword ? "text" : "password"}
                                placeholder="Cavabınız"
                                onChange={(e) => setNewPassword(e.target.value)}
                                value={newPassword}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                            >
                                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    <button className={`${styles.submit} column`} type="submit" disabled={loading}>
                        {loading ? "Dəyişdirilir..." : "Parolu Dəyiş"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChangePasswordSection;
