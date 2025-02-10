import React from 'react'
import styles from './ProfileTitle.module.scss'

const ProfileTitle = () => {
  return (
    <div className={`${styles.section} row`}>
        <div className={`${styles.content} row-bet`}>
            <p>Ugur Huseynov</p>
            <h3>Alpha Academy</h3>
          
        </div>
    </div>
  )
}

export default ProfileTitle