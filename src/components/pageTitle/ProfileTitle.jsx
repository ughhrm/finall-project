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
            
        
    {Array.isArray(userAuth) ? (
      userAuth.map(item => (
        <div key={item.id}>{item.name}</div>
      ))
    ) : (
      <p>No data available</p>
    )}
  

            <h3>Alpha Academy</h3>
          
        </div>
    </div>
  )
}

export default ProfileTitle