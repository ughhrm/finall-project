import React, { useEffect, useState } from 'react';
import styles from './LoginSection.module.scss';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLoginThunk } from '../../redux/slice/userLoginSlice';

const LoginSection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userLogin, error, loading } = useSelector((state) => state.userLogin);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      dispatch(userLoginThunk(values));
    },
  });

  useEffect(() => {
    if (userLogin) {
      setLoginSuccess(true);
      navigate('/dashboard');
    }
  }, [userLogin, navigate]);

  useEffect(() => {
    if (error) {
      setLoginSuccess(false); 
    }
  }, [error]);

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
              placeholder="İstifadəçi adı"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
          </div>
          <div className={`${styles.inputBox} column`}>
            <label htmlFor="password">Parol</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="İstifadəçi adı"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <div className={styles.forgotPassword}>
              <Link>Parolu unutdunuz?</Link>
            </div>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Yüklənir...' : 'Daxil olun'}
          </button>
        </form>
        <div className={`${styles.singupBtnBox} column-bet`}>
          <p>Və ya qeydiyyatdan keçin</p>
          <button>Qeydiyyatdan keçin</button>
        </div>
        {loginSuccess && !loading && !error && <p>Giriş uğurla tamamlandi!</p>}
      </div>
    </div>
  );
};

export default LoginSection;
