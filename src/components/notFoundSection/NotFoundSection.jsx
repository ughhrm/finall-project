import React from "react";
import styles from "./NotFoundSection.module.scss";
import { useNavigate } from "react-router-dom";

const NotFoundSection = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.notFoundContainer}>
            <h1 className={styles.errorCode}>404</h1>
            <p className={styles.errorMessage}>Səhifə tapılmadı</p>
            <button className={styles.goBackButton} onClick={() => navigate(-1)}>
                Geri dön
            </button>
        </div>
    );
};

export default NotFoundSection;
