import styles from './SingUpSection.module.scss'
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { resetError, signUpStudentandTeacherByAdminThunk } from '../../redux/slice/adminAuthSlice';
import { showSuccessAlert } from '../../alert';


const SingUpSection = () => {
  const dispatch = useDispatch();
  const [success, setSuccess] =useState("")
  const { error, loading } = useSelector((state) => state.adminAuth);

  const formik = useFormik({
    initialValues: {
      name: '',
      lastName: '',
      email: '',
      dateOfBirth: '',
      location: '',
      programmingLanguage: '',
      role:'',
      group:''
    },
    onSubmit: async (values) => {
      const action = await dispatch(signUpStudentandTeacherByAdminThunk(values));
      if (signUpStudentandTeacherByAdminThunk.fulfilled.match(action)) {
        showSuccessAlert("Istifadeci uğurla yaradildi!");
      }
    },
  });
  useEffect(()=>{
    dispatch(resetError())
    setSuccess("")

  },[dispatch])

  return (


    <div className={`${styles.section} column`}>
      <div className={`${styles.content} column-bet`}>
        <form className={`${styles.form} column-bet`} onSubmit={formik.handleSubmit}>
          <h4>İstifadəçi əlavə et</h4>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {success && <p style={{ color: 'green' }}>{success}</p>}

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
              <div className={`${styles.inputBox} ${styles.radio} column`}>
                <label htmlFor="role">Yeni istifadəçi rolu:</label>
                <div className={`${styles.radio} ${styles.role} row-bet`}>

                  <div className={`${styles.radioImput} row`}>
                    <input
                      type="radio"
                      id="teacher"
                      name="role"
                      required
                      onChange={formik.handleChange}
                      checked={formik.values.role === 'teacher'}
                      value="teacher"
                    />
                    <label htmlFor="teacher">teacher</label>
                  </div>

                  <div className={`${styles.radioImput} row`}>
                    <input
                      type="radio"
                      id="user"
                      name="role"
                      required
                      onChange={formik.handleChange}
                      checked={formik.values.role === 'user'}
                      value="user"
                    />
                    <label htmlFor="user">user</label>
                  </div>

                </div>
              </div>


              <div className={`${styles.inputBox} ${styles.radio} column`}>
                <label htmlFor="programmingLanguage">Programlasdirma dili:</label>
                <div className={`${styles.radioImputBigBox} row-bet`}>
                  <div className={`${styles.radioImputMiddleBox} column`}>
                    <div className={`${styles.radioImput} row`}>
                      <input
                        type="radio"
                        id="frontEnd"
                        name="programmingLanguage"
                        required
                        onChange={formik.handleChange}
                        checked={formik.values.programmingLanguage === 'FrontEnd'}
                        value="FrontEnd"
                      />
                      <label htmlFor="frontEnd">Front-End</label>
                    </div>

                    <div className={`${styles.radioImput} row`}>
                      <input
                        type="radio"
                        id="java"
                        name="programmingLanguage"
                        required
                        onChange={formik.handleChange}
                        checked={formik.values.programmingLanguage === 'Java'}
                        value="Java"
                      />
                      <label htmlFor="java">Java</label>
                    </div>

                    <div className={`${styles.radioImput} row`}>
                      <input
                        type="radio"
                        id="php"
                        name="programmingLanguage"
                        required
                        onChange={formik.handleChange}
                        checked={formik.values.programmingLanguage === 'PHP'}
                        value="PHP"
                      />
                      <label htmlFor="php">PHP</label>
                    </div>
                  </div>

                  <div className={`${styles.radioImputMiddleBox} column`}>
                    <div className={`${styles.radioImput} row`}>
                      <input
                        type="radio"
                        id="sql"
                        name="programmingLanguage"
                        required
                        onChange={formik.handleChange}
                        checked={formik.values.programmingLanguage === 'SQL'}
                        value="SQL"
                      />
                      <label htmlFor="sql">Oracle SQL & PL/SQL</label>
                    </div>

                    <div className={`${styles.radioImput} row`}>
                      <input
                        type="radio"
                        id="android"
                        name="programmingLanguage"
                        required
                        onChange={formik.handleChange}
                        checked={formik.values.programmingLanguage === 'Android'}
                        value="Android"
                      />
                      <label htmlFor="android">Android</label>
                    </div>

                    <div className={`${styles.radioImput} row`}>
                      <input
                        type="radio"
                        id="cSharp"
                        name="programmingLanguage"
                        required
                        onChange={formik.handleChange}
                        checked={formik.values.programmingLanguage === 'C#'}
                        value="C#"
                      />
                      <label htmlFor="cSharp">C#</label>
                    </div>
                  </div>

                  <div className={`${styles.radioImputMiddleBox} column`}>
                    <div className={`${styles.radioImput} row`}>
                      <input
                        type="radio"
                        id="graphicDesign"
                        name="programmingLanguage"
                        required
                        onChange={formik.handleChange}
                        checked={formik.values.programmingLanguage === 'Qrafik Dizayn'}
                        value="Qrafik Dizayn"
                      />
                      <label htmlFor="graphicDesign">Qrafik Dizayn</label>
                    </div>

                    <div className={`${styles.radioImput} row`}>
                      <input
                        type="radio"
                        id="uiUxDesign"
                        name="programmingLanguage"
                        required
                        onChange={formik.handleChange}
                        checked={formik.values.programmingLanguage === 'UI/UXDesign'}
                        value="UI/UXDesign"
                      />
                      <label htmlFor="uiUxDesign">UI/UX Dizayn</label>
                    </div>

                    <div className={`${styles.radioImput} row`}>
                      <input
                        type="radio"
                        id="twoDAnimation"
                        name="programmingLanguage"
                        required
                        onChange={formik.handleChange}
                        checked={formik.values.programmingLanguage === '2DAnimation'}
                        value="2DAnimation"
                      />
                      <label htmlFor="twoDAnimation">2D Animasiya</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={`${styles.rightBox} column-bet`}>
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
                <label htmlFor="group">Qrup</label>
                <input
                  id="group"
                  name="group"
                  type="text"
                  required
                  placeholder="Cavabınız"
                  onChange={formik.handleChange}
                  value={formik.values.group}
                />
              </div>
           

            </div>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Yüklənir...' : 'Əlavə et'}
          </button>
        </form>

      </div>
    </div>
  )
}

export default SingUpSection
