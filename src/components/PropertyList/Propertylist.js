import React from 'react'
import './Propertylist.css'
import useFetch from '../../hooks/useFetch'

function Propertylist() {
    const {data,loading,error}=useFetch("http://localhost:3001/api/hotels/countByType");
    console.log(data[0])
    const images=[
        'https://stylesatlife.com/wp-content/uploads/2018/02/Punjab-Tourist-Places-to-Visit-320x240.jpg',
        'https://media.cntraveler.com/photos/5a70f9df8af0dc48d25dafa1/master/w_320%2Cc_limit/Donggung-Palace-and-Wolji-Pond-GettyImages-591106790.jpg',
        'https://media.cntraveler.com/photos/588a0a4fbc3623e22c9e89de/master/w_320%2Cc_limit/bruges-Gallery-Stock-GS01079498.jpg',
        'https://images.hdqwalls.com/download/amazing-beautiful-places-320x240.jpg',
        'https://media.cntraveler.com/photos/588a0a4fbc3623e22c9e89de/master/w_320%2Cc_limit/bruges-Gallery-Stock-GS01079498.jpg'
    ];
  return (
    <div className='plist'>
        {loading ?("loading in progress"):
           ( <>{data &&
            images.map((img,i)=>(
            <div className='plistItem' key={i}>
                <img className='plistImg' src={img}/>
                <div className='plistTitles'>
                    <h1>{data[i]?.type}</h1>
                    <h2>{data[i]?.count} {data[i]?.type}</h2>
                 </div>
            </div>))}
        </>)}
    </div>
  )
}

export default Propertylist