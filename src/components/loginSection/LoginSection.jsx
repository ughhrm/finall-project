import React from 'react'
import styles from './LoginSection.module.scss'
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';

const LoginSection = () => {
    const formik = useFormik({
        initialValues: {
          userName: '',
          password: '',
        },
        onSubmit: values => {
          alert(JSON.stringify(values, null, 2));
        },
      });  
  return (
    <div className={`${styles.section} column`}>
        <div className={`${styles.content} column-bet`}>
        <form className={`${styles.form} column-bet`} onSubmit={formik.handleSubmit}>
        <p>Daxil ol</p>

      <div className={`${styles.inputBox} column`}>
      <label htmlFor="userName">Istifadəçi adı</label>
       <input
         id="userName"
         name="userName"
         type="text"
         placeholder='İstifadəçi adı'
         onChange={formik.handleChange}
         value={formik.values.userName}
       />
      </div>
      <div className={`${styles.inputBox} column`}>
      <label htmlFor="password">Parol</label>
       <input
         id="password"
         name="password"
         type="password"
         placeholder='İstifadəçi adı'
         onChange={formik.handleChange}
         value={formik.values.password}
       />
        <div className={styles.forgotPassword}>
          <Link>Parolu unutdunuz?</Link>
        </div>

      </div>
      
       <button type="submit">Daxil olun</button>
     </form>
     <div className={`${styles.singupBtnBox} column-bet`}>
        <p>Və ya qeydiyyatdan keçin</p>
        <button>Qeydiyyatdan keçin</button>
     </div>
        </div>
    </div>
  )
}

export default LoginSection