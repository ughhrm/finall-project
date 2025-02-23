import React from 'react'
import styles from './PreCoding.module.scss'
import { useNavigate } from 'react-router-dom'

const PreCoding = () => {
  const navigate = useNavigate()
  return (
    <div className={`${styles.section} row`}>
      <div className={`${styles.content} row-bet`}>
        <div className={`${styles.info} column-bet`}>
          <h1>PRE-CODING</h1>

          <div>
            <h5>TƏDRİS PROGRAMI</h5>
            <p>Müddət : 1 ay</p>
          </div>
          <p>
            Proqramlaşdırma karyerasına hansı istiqamətdən başlamalı olduğunu bilməyən şəxslər üçün Front-End, Back-End, Database, Mobil kimi istiqamətləri özündə birləşdirən modullar toplusu
          </p>

          <button onClick={() => navigate("/notification-send")}>Müraciət et</button>

        </div>
        <div className={`${styles.imgBox} row`}>
          <div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default PreCoding