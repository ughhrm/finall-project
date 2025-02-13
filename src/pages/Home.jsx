import React from 'react'
import Header from '../components/header/Header'
import VideoSection from '../components/videoSection/VideoSection'
import OurTraining from '../components/ourTraining/OurTraining'
import Title from '../components/title/Title'
import SuccessMetrics from '../components/successMetrics/SuccessMetrics'
import Address from '../components/address/Address'
import Footer from '../components/footer/Footer'
import CareerDestinations from '../components/careerDestinations/CareerDestinations'
import PreCoding from '../components/preCoding/PreCoding'
import EmptySection from '../components/emptySection/EmptySection'
import SmalHeader from '../components/smallHeader/SmalHeader'

const Home = () => {
  return (
    <div>
      <SmalHeader/>
        <Header/>
        <VideoSection/>
        <EmptySection/>
        <Title  p={"Təlimlərimiz"} /> 
        <OurTraining/>
        <PreCoding/>
        <SuccessMetrics/>
        <CareerDestinations/>
        <Address/>
         
        <Footer/>
     
        

    </div>
  )
}

export default Home