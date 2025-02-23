import React, { useEffect, useState } from 'react'
import styles from './AdminLoginSection.module.scss'
import { IoIosEyeOff } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { adminLogInThunk, resetError } from '../../redux/slice/adminAuthSlice';


const AdminLoginSection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading } = useSelector((state) => state.adminAuth);
  const [showSecretLogin, setShowSecretLogin] = useState(false);
 const [showPassword, setShowPassword] = useState(false);
  
  

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      secretCode:'',
    },
    onSubmit: async (values, { resetForm }) => {
      const action = await dispatch(adminLogInThunk(values));

      if (adminLogInThunk.fulfilled.match(action)) {
        resetForm();
        navigate("/admin-notification")
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
        <h4>Daxil ol</h4>
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <div className={`${styles.inputBox} column`}>
          <label htmlFor="email">Email</label>
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
        <div className={`${styles.inputBox} column`}>
          <label htmlFor="secretCode">Gizli şifrə</label>
          <div className={`${styles.passwordInputBox} row-bet`}>
            <input
              id="secretCode"
              name="secretCode"
              type={showSecretLogin ? "text" : "password"}
              placeholder="Cavabınız"
              onChange={formik.handleChange}
              value={formik.values.secretCode}
              required
            />
            <button
              onMouseDown={() => setShowSecretLogin(true)}  
              onMouseUp={() => setShowSecretLogin(false)}  
              onMouseLeave={() => setShowSecretLogin(false)}>
              {showSecretLogin ? <FaEye /> : <IoIosEyeOff />}
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
              {showPassword ? <FaEye /> : <IoIosEyeOff />}
            </button>
          </div>
          <div className={styles.forgotPassword}>
            <Link >Parolu unutdunuz?</Link>
          </div>
        </div>
       

        <button className={`${styles.submit} column`} type="submit" >
          {loading ? 'Yüklənir...' : 'Daxil olun'}
        </button>
      </form>
      <div className={`${styles.singupBtnBox} column-bet`}>
        <p>Və ya qeydiyyatdan keçin</p>
        <button onClick={() => navigate("/singup")}>Qeydiyyatdan keçin</button>
      </div>
    </div>
  </div>
  )
}

export default AdminLoginSection