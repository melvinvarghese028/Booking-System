import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Header from '../../components/Header/Header'
import Featured from '../../components/featured/Featured'
import './home.css'
import Propertylist from '../../components/PropertyList/Propertylist'
import Featuredproperty from '../../components/featuredProperty/Featuredproperty'
import Maillist from '../../components/mailList/Maillist'
import Footer from '../../components/Footer/Footer'
function Home() {
  return (
    <div>
      <Navbar/>
      <Header/>
      <div className='homeContainer'>
        <Featured/>
        <h1 className='homeTitle'>Browse by Property</h1>
        <Propertylist/>
        <h1 className='homeTitle'>home guests love</h1>
        <Featuredproperty/>
        <Maillist/>
        <Footer/>
      </div>
    </div>
  )
}

export default Home