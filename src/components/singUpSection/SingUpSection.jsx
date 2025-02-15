import styles from './SingUpSection.module.scss'
import {  userAuthSignUpThunk } from '../../redux/slice/userAuthSlice';
import { useFormik } from 'formik';
import {  useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IoIosEyeOff } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import { useState } from 'react';


const SingUpSection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading } = useSelector((state) => state.userAuth);

  const formik = useFormik({
    initialValues: {
      name: '',
      lastName: '',
      email: '',
      password: '',
      dateOfBirth: '',
      location: '',
      programmingLanguage: ''
    },
    onSubmit: async (values) => {
      const action = await dispatch(userAuthSignUpThunk(values));
      if (userAuthSignUpThunk.fulfilled.match(action)) {
        navigate("/login")
      }
    },
  });
    const [showPassword, setShowPassword] = useState(false);
  
  return (
    <div className={`${styles.section} column`}>
      <div className={`${styles.content} column-bet`}>
        <form className={`${styles.form} column-bet`} onSubmit={formik.handleSubmit}>
          <h4>Qeydiyattan kec</h4>
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
                        checked={formik.values.programmingLanguage === 'GraphicDesign'}
                        value="GraphicDesign"
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
                type="button"

                onMouseDown={() => setShowPassword(true)}  // Basanda açılır
                onMouseUp={() => setShowPassword(false)}  // Buraxanda bağlanır
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
    </div>
  )
}

export default SingUpSection
