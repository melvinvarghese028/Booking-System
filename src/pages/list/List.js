import React, { useState } from 'react'
import './list.css';
import Navbar from '../../components/Navbar/Navbar'
import Header from '../../components/Header/Header'
import { useLocation } from 'react-router-dom';
import { format } from 'date-fns';
import { DateRange } from 'react-date-range';
import Searchitem from '../../components/SearchItem/Searchitem';
import useFetch from '../../hooks/useFetch';
function List() {
  const location=useLocation();
  const [destination,setDestination]=useState(location.state.destination);
  const [dates,setDates]=useState(location.state.dates);
  const [options,setOptions]=useState(location.state.options);
  const [openDate, setopenDate] = useState(false);
  const [min,setMin]=useState(undefined);
  const [max,setMax]=useState(undefined);
  const {data,loading,error,refetch}=useFetch(`http://localhost:3001/api/hotels?city=${destination}&min=${min || 0}&max=${max || 999}`)
  console.log(data)
  const handleClick=()=>{
    refetch()

  }
  return (
    <div>
      <Navbar />
      <Header type="list"/>
      <div className='listContainer'>
        <div className='listWrapper'>
          <div className='listSearch'>
            <h1 className='lsTitle'>Search</h1>
            <div className='lsItem'>
              <label>Destination</label>
              <input type='text' placeholder={destination}/>
            </div>
            <div className='lsItem'>
              <label>Check in Date</label>
              <span onClick={()=>setopenDate(!openDate)}>{`${format(dates[0].startDate,"MM/dd/yyyy")} to ${format(dates[0].endDate,"MM/dd/yyyy")}`}</span>
              {openDate && <DateRange
                onChange={(item)=>setDates([item.selection])}
                minDate={new Date()}
                ranges={dates}/>}
            </div>
            <div className='lsItem'>
              <label>Options</label>
              <div className='lsOptions'>
                <div className='lsOptionItem'>
                  <span className='lsOptionText'>
                    Min Price <small>per night</small>
                    </span>
                    <input className='lsOptionInput' type='number' onChange={e=>setMin(e.target.value)}></input>
                </div>
                <div className='lsOptionItem'>
                  <span className='lsOptionText'>
                    Max Price <small>per night</small>
                    </span>
                    <input className='lsOptionInput' type='number' onChange={e=>setMax(e.target.value)}></input>
                </div>
                <div className='lsOptionItem'>
                  <span className='lsOptionText'>
                    Adult 
                    </span>
                    <input className='lsOptionInput' min={1}type='number' placeholder={options.adults}></input>
                </div>
                <div className='lsOptionItem'>
                  <span className='lsOptionText'>
                    Children
                    </span>
                    <input className='lsOptionInput' min={0} type='number' placeholder={options.children}></input>
                </div>
                <div className='lsOptionItem'>
                  <span className='lsOptionText'>
                    Room 
                    </span>
                    <input className='lsOptionInput' min={1} type='number' placeholder={options.room}></input>
                </div>
              </div>
            </div>
            <button onClick={handleClick} >Search</button>
          </div>
          <div className='listResult'>
            {loading? "loading text":<>
                {data.map(item=>(
                  <Searchitem item={item} key={item._id}/>
                ))}
                
             </> }
          </div>
        </div>
      </div>
    </div>
  )
}

export default List