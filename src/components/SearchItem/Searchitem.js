import React from 'react'
import './Searchitem.css'
import { Link } from 'react-router-dom'
function Searchitem({item}) {
  return (
    <div className='searchitem'>
      <img src={item.photos[0]}className='siImg'/>
      <div className='siDesc'>
        <h1 className='siTitle'>{item.name}</h1>
        <span className='siDistance'>{item.distance}</span>
        <span className='siTaxiOp'>Free airport taxi</span>
        <span className='siSubtitle'>
          Studio Apartment with Air Conditioning
        </span>
        <span className='siFeatures'>
          {item.desc}
        </span>
        <span className='siCancelop'>free cancellation</span>
        <span className='siCancelOpSubtitle'>
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className='siDetails'>
      {item.rating &&  <div className='siRating'>
          <span>Excellent</span>
          <button>{item.rating}</button>
        </div>}
        <div className='siDetailsTexts'>
          <span className='siPrice'>${item.cheapestPrice}</span>
          <span className='siTaxOp'>Includes Tax and Fees</span>
          <Link to={`/hotels/${item._id}`}>
          <button className='siCheckButton'>See Availibilty</button>
          </Link>

          
        </div>
      </div>
    </div>
  )
}

export default Searchitem