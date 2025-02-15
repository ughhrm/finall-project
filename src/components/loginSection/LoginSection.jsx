import React, { useEffect, useState } from 'react';
import styles from './LoginSection.module.scss';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetError, userAuthLoginThunk } from '../../redux/slice/userAuthSlice';
import { IoIosEyeOff } from "react-icons/io";
import { FaEye } from "react-icons/fa";


const LoginSection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading } = useSelector((state) => state.userAuth);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values, { resetForm }) => {
      const action = await dispatch(userAuthLoginThunk(values));

      if (userAuthLoginThunk.fulfilled.match(action)) {
        resetForm();
        navigate("/student-profile")
      }

    },
  });

  useEffect(() => {
    dispatch(resetError());
  }, [dispatch]);

  const [showPassword, setShowPassword] = useState(false);





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
            />
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
              />
              <button
                type="button"
                onMouseDown={() => setShowPassword(true)}  
                onMouseUp={() => setShowPassword(false)}  
                onMouseLeave={() => setShowPassword(false)}            >
                {showPassword ? <FaEye /> : <IoIosEyeOff />}
              </button>
            </div>
            <div className={styles.forgotPassword}>
              <Link>Parolu unutdunuz?</Link>
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
        {loginSuccess && !loading && !error && <p>Giriş uğurla tamamlandi!</p>}
      </div>
    </div>
  );
};

export default LoginSection;
