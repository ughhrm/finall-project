import React from 'react'
import styles from './Title.module.scss'

const Title = ({p}) => {
  return (
    <div className={`${styles.section} row`}>
        <p>{p}</p>
    </div>
  )
}

export default Title