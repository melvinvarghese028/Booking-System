import React from 'react'
import './featuredproperty.css'
import useFetch from '../../hooks/useFetch'
function Featuredproperty() {
    const {data,loading,error}=useFetch("http://localhost:3001/api/hotels?featured=true&limit=3");
    console.log(data)
    const images=[
        "https://mediavault.point2.com/p2h/listing/b10d/0e3e/6571/11bc50b5e46482da52bd/wm_w420h630.jpg",
        'https://mediavault.point2.com/p2h/listing/b10d/0e3e/6571/11bc50b5e46482da52bd/wm_w420h630.jpg',
        'https://mediavault.point2.com/p2h/listing/b10d/0e3e/6571/11bc50b5e46482da52bd/wm_w420h630.jpg',
        'https://mediavault.point2.com/p2h/listing/b10d/0e3e/6571/11bc50b5e46482da52bd/wm_w420h630.jpg'
    ]
  return (
    <div className='fp'>
        {data &&
            loading?("loading in progress"):
            (
        <> 
        {data.map((item)=>(
        <div className='fpItem'>
            <img className='fpImg' src={item.photos[0]} alt=""/>
            <span className='fpName'>{item.name}</span>
            <span className='fpCity'>{item.city}</span>
            <span className='fpPrice'>Starting from ${item.cheapestPrice}</span>
           {item.rating && <div className='fpRating'>
                <button>{item.rating}</button>
                <span>Excellent</span>
            </div>}
        </div>))}
        </>)} 
    </div>
  )
}

export default Featuredproperty