import React from 'react'
import styles from './StudentProfileSection.module.scss'
import { useDispatch } from 'react-redux'
import { userAuthLogOutThunk } from '../../redux/slice/userAuthSlice'
import { useNavigate } from 'react-router-dom'


const StudentProfileSection = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleLogout = async() => {
   const action = await dispatch(userAuthLogOutThunk())
   if(userAuthLogOutThunk.fulfilled.match(action)){
    navigate('/login')
   }
  }
  
  return (
    <div className={`${styles.section} row`}>
        <div className={`${styles.content} row-bet`}>
          <div className={`${styles.imgBox} row`}>
            <img src="data:image/jpeg;base64,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" alt="" />
          </div>
          <div className={`${styles.infoBox} column-bet`}>
            <div className={`${styles.title} row`}>
              <h2>Telebe Profili</h2>
              <button onClick={handleLogout}>Log out</button>
            </div>
            <div className={`${styles.info} row-bet`}>
              <div className={`${styles.leftBox} column-bet`}>
                <div>
                  <p>Ad:</p>
                  <h3>Ugur</h3>
                
                </div>
                <div>
                  <p>Soy Ad:</p>
                  <h3>Huseynov</h3>
                
                </div>
                <div>
                  <p>Programlasdirma dili:</p>
                  <h3>Backend</h3>
                </div>
                <div>
                  <p>Telefon:</p>
                  <h3>055-990-57-48</h3>
                </div> 
              </div>
              <div className={`${styles.rightBox} column-bet`}>
              <div>
                  <p>Cins:</p>
                  <h3>Kisi</h3>
                
                </div>
                <div>
                  <p>Adrress:</p>
                  <h3>Baku</h3>
                
                </div>
                <div>
                  <p>Email:</p>
                  <h3>ugur@gmail.com</h3>
                
                </div>

              </div>

            </div>
          </div>

        </div>
    </div>
  )
}

export default StudentProfileSection