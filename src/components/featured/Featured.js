import React from 'react'
import './featured.css'
import useFetch from '../../hooks/useFetch'

function Featured() {
    const {data,loading,error}=useFetch("http://localhost:3001/api/hotels/countByCity?cities=barcelona,madrid");
    console.log(data);
  return (
    <div className='featured'>
        {loading? (
            "loading please wait"
        ):(
            <><div className='featuredItem'>
            <img className='featuredImg' src='https://hips.hearstapps.com/hbu.h-cdn.co/assets/16/17/1461606167-1461265325-santorini-gettyimages-107741204.jpg?resize=480:*' alt='img'/>
            <div className='featuredTitles'>
                <h1>Madrid</h1>
                <h2>{data[0]} Properties</h2>
            </div>
        </div>
        <div className='featuredItem'>
            <img className='featuredImg' src='https://hips.hearstapps.com/hmg-prod/images/beautiful-oia-royalty-free-image-1570210636.jpg?resize=480:*' alt='img'/>
            <div className='featuredTitles'>
                <h1>Madrid</h1>
                <h2>{data[1]}Properties</h2>
            </div>
        </div>
        <div className='featuredItem'>
            <img className='featuredImg' src='https://hips.hearstapps.com/hmg-prod/images/great-ocean-road-128394846-1494616348.jpg?resize=480:*' alt='img'/>
            <div className='featuredTitles'>
                <h1>Barcelona</h1>
                <h2>{data[2]}Properties</h2>
            </div>
        </div></>)}
    </div>
  )
}

export default Featured