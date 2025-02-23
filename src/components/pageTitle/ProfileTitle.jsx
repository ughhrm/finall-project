import React, { useEffect } from 'react'
import styles from './ProfileTitle.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getUserAuthThunk } from '../../redux/slice/userAuthSlice'

const ProfileTitle = () => {
  const dispatch = useDispatch()
  const {userAuth} =useSelector(state=>state.userAuth)
  useEffect(()=>{
    dispatch(getUserAuthThunk())
  },[dispatch])
 
  return (
    <div className={`${styles.section} row`}>
        <div className={`${styles.content} row-bet`}>
            
        {userAuth ? (
        
          <p> {userAuth.email}</p>

      ) : (
        <p>İstifadəçi məlumatları tapılmadı.</p>
      )}

            <h3>Alpha Academy</h3>
          
        </div>
    </div>
  )
}

export default ProfileTitle