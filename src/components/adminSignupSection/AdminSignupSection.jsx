import React, { useEffect, useState } from 'react'
import styles from './AdminSignupSection.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { FaEye } from "react-icons/fa";
import { IoIosEyeOff } from "react-icons/io";
import { adminSignUpThunk, resetError } from '../../redux/slice/adminAuthSlice';
import { showSuccessAlert } from '../../alert';




const AdminSignupSection = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, loading } = useSelector((state) => state.adminAuth);
    const [showPassword, setShowPassword] = useState(false);
    const [showSecretSignup, setShowSecretSignup] = useState(false);


    const formik = useFormik({
        initialValues: {
            name: "",
            lastName: "",
            email: "",
            password: "",
            dateOfBirth: "",
            location: "",
            secretCode:""
        },
        onSubmit: async (values,{resetForm}) => {

              const action = await dispatch(adminSignUpThunk(values));
                  if (adminSignUpThunk.fulfilled.match(action)) {
                    resetForm();
                    showSuccessAlert("Admin Ugurla Yaradildi")
                    
                    navigate("/admin-login")

                  }

        },

    });
    useEffect(()=>{
        dispatch(resetError())
    },[dispatch])


    return (
        <div className={`${styles.section} column`}>
            <div className={`${styles.content} column-bet`}>
                <form className={`${styles.form} column-bet`} onSubmit={formik.handleSubmit}>
                    <h4>Admin Qeydiyyatı</h4>
                    {error && <p style={{ color: 'red' }}>{error}</p>}

                    <div className={`${styles.bigBox} row-bet`}>
                        <div className={`${styles.leftBox} column-bet`}>
                            <div className={`${styles.inputBox} column`}>
                                <label htmlFor="name">Ad:</label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    placeholder="Cavabınız"
                                    onChange={formik.handleChange}
                                    value={formik.values.name}
                                />
                            </div>
                            <div className={`${styles.inputBox} column`}>
                                <label htmlFor="lastName">Soy Ad:</label>
                                <input
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    placeholder="Cavabınız"
                                    required
                                    onChange={formik.handleChange}
                                    value={formik.values.lastName}
                                />
                            </div>
                            <div className={`${styles.inputBox} column`}>
                                <label htmlFor="dateOfBirth">Doğum Tarixi</label>
                                <input
                                    id="dateOfBirth"
                                    name="dateOfBirth"
                                    type="date"
                                    placeholder="Cavabınız"
                                    onChange={formik.handleChange}
                                    required
                                    value={formik.values.dateOfBirth}
                                />
                            </div>
                            <div className={`${styles.inputBox} column`}>
                                <label htmlFor="location">Yaşadığı Yer</label>
                                <input
                                    id="location"
                                    name="location"
                                    type="text"
                                    placeholder="Cavabınız"
                                    onChange={formik.handleChange}
                                    required
                                    value={formik.values.location}
                                />
                            </div>

                        </div>
                        <div className={`${styles.rightBox} column-bet`}>

                            <div className={`${styles.inputBox} column`}>
                                <label htmlFor="email">Email</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="Cavabınız"
                                    onChange={formik.handleChange}
                                    required
                                    value={formik.values.email}
                                />
                            </div>
                            <div className={`${styles.inputBox} column`}>
                                <label htmlFor="secretCode">Gizli şifrə</label>
                                <div className={`${styles.passwordInputBox} row-bet`}>
                                    <input
                                        type={showSecretSignup ? "text" : "password"}
                                        id="secretCode"
                                        value={formik.values.secretCode}
                                        onChange={formik.handleChange}
                                        placeholder="Cavabınız"
                                        required
                                    />
                                    <button
                                        onMouseDown={() => setShowSecretSignup(true)} 
                                        onMouseUp={() => setShowSecretSignup(false)} 
                                        onMouseLeave={() => setShowSecretSignup(false)}            >
                                        {showSecretSignup ? <IoIosEyeOff /> : <FaEye />}
                                    </button>
                                </div>

                            </div>

                            <div className={`${styles.inputBox} column`}>
                                <label htmlFor="password">Parol</label>
                                <div className={`${styles.passwordInputBox} row-bet`}>
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Cavabınız"
                                        onChange={formik.handleChange}
                                        value={formik.values.password}
                                        required
                                    />
                                    <button

                                        onMouseDown={() => setShowPassword(true)}  
                                        onMouseUp={() => setShowPassword(false)}  
                                        onMouseLeave={() => setShowPassword(false)}            >
                                        {showPassword ? <IoIosEyeOff /> : <FaEye />}
                                    </button>
                                </div>

                            </div>

                        </div>
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading ? 'Yüklənir...' : 'Qeydiyyatdan kec'}
                    </button>
                </form>

            </div>
        </div>)
}

export default AdminSignupSection