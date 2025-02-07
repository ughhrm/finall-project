import React from 'react'
import Header from '../components/header/Header'
import VideoSection from '../components/videoSection/VideoSection'
import OurTraining from '../components/ourTraining/OurTraining'
import Title from '../components/title/Title'
import SuccessMetrics from '../components/successMetrics/SuccessMetrics'
import Address from '../components/address/Address'
import Footer from '../components/footer/Footer'

const Home = () => {
  return (
    <div>
        <Header/>
        <VideoSection/>
        <Title  p={"Təlimlərimiz"} /> 
        <OurTraining/>
        <SuccessMetrics/>
        <Address/>
        
        <Footer/>
     
        

    </div>
  )
}

export default Home