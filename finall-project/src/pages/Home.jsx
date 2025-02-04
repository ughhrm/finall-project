import React from 'react'
import Header from '../components/header/Header'
import VideoSection from '../components/videoSection/VideoSection'
import OurTraining from '../components/ourTraining/OurTraining'
import Title from '../components/title/Title'
import SuccessMetrics from '../components/successMetrics/SuccessMetrics'

const Home = () => {
  return (
    <div>
        <Header/>
        <VideoSection/>
        <Title  p={"Təlimlərimiz"} /> 
        <OurTraining/>
        <SuccessMetrics/>
     
        

    </div>
  )
}

export default Home