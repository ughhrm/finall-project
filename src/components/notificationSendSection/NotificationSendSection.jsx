import styles from './NotificationSendSection.module.scss'
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { resetError } from '../../redux/slice/adminAuthSlice';
import { createNotificationThunk } from '../../redux/slice/notificationSlice';
import { useNavigate } from 'react-router-dom';
import { showSuccessAlert } from '../../alert';

const NotificationSendSection = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { error, loading } = useSelector((state) => state.notifications);


    const formik = useFormik({
        initialValues: {
            name: '',
            lastName: '',
            phone: '',
            programmingLanguage: '',
            skillLevel: '',
            email: '',
        },
        onSubmit: async (values, { resetForm }) => {
            const action = await dispatch(createNotificationThunk(values));
            if (createNotificationThunk.fulfilled.match(action)) {
            
                resetForm();
                showSuccessAlert("Müraciət uğurla göndərildi!");
                navigate("/")
            }
        },
    });

    useEffect(() => {
        dispatch(resetError());
    }, [dispatch]);

    return (
        <div className={`${styles.section} column`}>
            <div className={`${styles.content} column-bet`}>
                <form className={`${styles.form} column-bet`} onSubmit={formik.handleSubmit}>
                    <h4>Proqramlaşdırma və Dizayn təhsilinə başlamaq üçün müraciət formu</h4>
                    {error && <p style={{ color: 'red' }}>{error}</p>}

                    <div className={`${styles.bigBox} row-bet`}>
                        <div className={`${styles.leftBox} column-bet`}>
                            <div className={`${styles.inputBox} column`}>
                                <label htmlFor="name">Ad:</label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="Adınızı daxil edin"
                                    onChange={formik.handleChange}
                                    value={formik.values.name}
                                    required
                                />
                            </div>

                            <div className={`${styles.inputBox} column`}>
                                <label htmlFor="lastName">Soyad:</label>
                                <input
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    placeholder="Cavabınız"
                                    onChange={formik.handleChange}
                                    value={formik.values.lastName}
                                    required
                                />
                            </div>
                            <div className={`${styles.inputBox} column`}>
                                <label htmlFor="phone">Əlaqə Nömrəsi:</label>
                                <input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    placeholder="Cavabınız"
                                    onChange={formik.handleChange}
                                    value={formik.values.phone}
                                    required
                                />
                            </div>


                        </div>

                        <div className={`${styles.rightBox} column-bet`}>


                            <div className={`${styles.inputBox} column`}>
                                <label htmlFor="programmingLanguage">Proqramlaşdırma Dili:</label>
                                <select
                                    id="programmingLanguage"
                                    name="programmingLanguage"
                                    onChange={formik.handleChange}
                                    value={formik.values.programmingLanguage}
                                    required
                                >
                                    <option value="">Seçin</option>
                                    <option value="FrontEnd">Front-End</option>
                                    <option value="Java">Java</option>
                                    <option value="PHP">PHP</option>
                                    <option value="SQL">Oracle SQL & PL/SQL</option>
                                    <option value="Android">Android</option>
                                    <option value="C#">C#</option>
                                    <option value="Qrafik Dizayn">Qrafik Dizayn</option>
                                    <option value="UI/UXDesign">UI/UX Dizayn</option>
                                    <option value="2DAnimation">2D Animasiya</option>
                                </select>
                            </div>

                            <div className={`${styles.inputBox} column`}>
                                <label htmlFor="skillLevel">Bilik səviyyəniz:</label>
                                <select
                                    id="skillLevel"
                                    name="skillLevel"
                                    onChange={formik.handleChange}
                                    value={formik.values.programmingLevel}
                                    required
                                >
                                    <option value="">Seçin</option>
                                    <option value="Sıfır">Sıfır</option>
                                    <option value="Başlanğıc">Başlanğıc</option>
                                    <option value="Orta">Orta</option>
                                </select>
                            </div>
                            <div className={`${styles.inputBox} column`}>
                                <label htmlFor="email">Email:</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="Cavabınız"
                                    onChange={formik.handleChange}
                                    value={formik.values.email}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading ? 'Yüklənir...' : 'Təqdim edin'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default NotificationSendSection;
