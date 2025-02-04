import React from 'react'
import styles from './SuccessMetrics.module.scss'

const SuccessMetrics = () => {
  return (
    <div className={`${styles.section} row`}>
        <div className={`${styles.content} row-bet`}>
            <div  className={`${styles.cart} column-bet`}>
                <h4>900K</h4>
                <p>Sətir Kod</p>    
            </div>
            <div  className={`${styles.cart} column-bet`}>
                <h4>10M</h4>
                <p>Tələbələr</p>    
            </div>
            <div  className={`${styles.cart} column-bet`}>
                <h4>15M</h4>
                <p>Kofe</p>    
            </div>

        </div>
    </div>

  )
}

export default SuccessMetrics