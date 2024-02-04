import React, { useContext, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar';
import Header from '../../components/Header/Header'
import './Hotel.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import Maillist from '../../components/mailList/Maillist';
import Footer from '../../components/Footer/Footer';
import useFetch from '../../hooks/useFetch';
import { useLocation, useNavigate } from 'react-router-dom';
import { SearchContext } from '../../context/SearchContext';
import { AuthContext } from '../../context/AuthContext';
import Reserve from '../../components/Reserve/Reserve';
function Hotel() {
  const location=useLocation();
  const id=location.pathname.split('/')[2];
  const navigate=useNavigate();
  const [slidernumber,setSliderNumber]=useState(0);
  const[open,setopen]=useState(false);
  const {data,loading,error}=useFetch(`http://localhost:3001/api/hotels/find/${id}`)
  console.log(data);
  const {dates,options} =useContext(SearchContext);
  const {user} =useContext(AuthContext);
  const [openMode,setopenModel]=useState(false);
  const MILLISECONDS_PER_DAY=1000 * 60 * 60 *24;
  function dayDifference(date1,date2){
    const timeDiff=Math.abs(date2.getTime()-date1.getTime());
    const diffDays=Math.ceil(timeDiff/MILLISECONDS_PER_DAY);
    return diffDays;
  }
 const days= dayDifference(dates[0].endDate,dates[0].startDate);
  console.log(dates);

  const handleOpen=(i)=>{
    setopen(true);
    setSliderNumber(i);
  }
  const handleArrow=(direction)=>{
    let newslideNumber;

    if(direction ==='l'){
      newslideNumber=slidernumber ===0? 5:slidernumber-1;
    }
    else{
      newslideNumber=slidernumber===5?0:slidernumber+1;
    }
    setSliderNumber(newslideNumber);
  }
  const handleClick=()=>{
    if(user){
      setopenModel(true);
    }else{
      navigate('/login');
    }
  }
  return (
    <div>
      <Navbar/>
      <Header type='list'/>
      <div className='hotelContainer'>
        {open && <div className='slider'>
            <FontAwesomeIcon icon={faCircleXmark} className='close' onClick={()=>setopen(false)}/>
            <FontAwesomeIcon icon={faCircleArrowLeft} className='arrow' onClick={()=>handleArrow('l')}/>
            <div className='sliderWrapper'>
              <img className='sliderImg' src={data.photos[slidernumber]}/>
            </div>
            <FontAwesomeIcon icon={faCircleArrowRight} className='arrow' onClick={()=>handleArrow('r')}/>
          </div>}
        <div className='hotelWrapper'>
          <button onClick={handleClick} className='bookNow'>Reserve of Book Now!</button>
          <h1 className='hotelTitle'>{data.name}</h1>
          <div className='hotelAddress'>
            <FontAwesomeIcon icon={faLocationDot}/>
            <span>{data?.city}</span>
          </div>  
          <span className='hotelDistance'>
            Excellent location {data?.distance} m from center
          </span>
          <span className='hotelPriceHighlight'>
            Book a stay over ${data?.cheapestPrice} at this property and get a free airport taxi
          </span>
          <div className='hotelImages'>
            {data.photos?.map((photo,i)=>(
              <div className='hotelImgWrapper'>
                <img onClick={()=>handleOpen(i)} src={photo.src} className='hotelImg'/>
              </div>
            ))}
          </div>
          <div className='hotelDetails'>
            <div className='hotelDetailsText'>
                <h1 className='hotelTitle'>{data?.title}</h1>
                <p className='hotelDesc'>
                 {data?.desc}
                </p>
            </div>
            <div className='hotelDetailsPrice'>
              <h1>Perfect for a {days}-night stay!</h1>
              <span>
                Located in the real hear of Krakow, this property has an 
                excellent location score of 9.8!
              </span>
              <h2>
                <b>${days * data?.cheapestPrice * options?.room}</b>({days} nights)
              </h2>
              <button>Reserve or Book Now!</button>
            </div>
          </div>
        </div>
        <Maillist/>
        <Footer/>
      </div>
      {openMode && <Reserve setopen={setopenModel} hotelid={id}/>}
    </div>
  )
}

export default Hotel