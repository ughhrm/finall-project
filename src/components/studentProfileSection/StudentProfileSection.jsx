import React, { useEffect } from 'react'
import styles from './StudentProfileSection.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getUserAuthThunk, userAuthLogOutThunk } from '../../redux/slice/userAuthSlice'
import { useNavigate } from 'react-router-dom'


const StudentProfileSection = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { userAuth } = useSelector(state => state.userAuth)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate('/');
    }
    dispatch(getUserAuthThunk())

  }, [dispatch])

  const date = new Date(userAuth.dateOfBirth);
  const formattedDate = date.toLocaleDateString("az-AZ");


  return (
    <div className={`${styles.section} row`}>
      <div className={`${styles.content} row-bet`}>
        <div className={`${styles.imgBox} row`}>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUQhdJU1r0EVos4Edswt4noEikFgWJZAPXDw&s" alt="" />
        </div>
        <div className={`${styles.infoBox} column-bet`}>
          <div className={`${styles.title} row`}>
            <h2>Telebe Profili</h2>
          </div>

          {userAuth ? (
            <div className={`${styles.info} row-bet`}>
              <div className={`${styles.leftBox} column-bet`}>
                <div>
                  <p>Ad:</p>
                  <h3>{userAuth.name}</h3>

                </div>
                <div>
                  <p>Soy Ad:</p>
                  <h3>{userAuth.lastName}</h3>

                </div>
                <div>
                  <p>Programlasdirma dili:</p>
                  <h3>{userAuth.programmingLanguage}</h3>
                </div>
              
              </div>
              <div className={`${styles.rightBox} column-bet`}>
                <div>
                  <p>Doğum Tarixiniz:</p>
                  <h3>{formattedDate}</h3>

                </div>

                <div>
                  <p>Adrress:</p>
                  <h3>{userAuth.location}</h3>

                </div>
                <div>
                  <p>Email:</p>
                  <h3>{userAuth.email}</h3>

                </div>
                <div>
                  <p>Qurup:</p>
                  <h3>{userAuth.group}</h3>

                </div>


              </div>

            </div>
          ) : (
            <p>Isitifadeci melumatlari tapilmadi</p>
          )}

        </div>

      </div>
    </div>
  )
}

export default StudentProfileSection