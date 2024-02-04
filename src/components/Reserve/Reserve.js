import React, { useContext, useState } from 'react'
import {SearchContext} from '../../context/SearchContext'
import "./Reserve.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import useFetch from '../../hooks/useFetch';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function Reserve({setopen,hotelid}) {
    console.log(hotelid)
    const {data,loading,error}=useFetch(`http://localhost:3001/api/hotels/rooms/${hotelid}`)
    console.log(data)
    const navigate=useNavigate();
    const {dates}=useContext(SearchContext)
    const [selectedRooms,setSelectedRooms]=useState([]);
    const getDatesInRange=(startDate,endDate)=>{
        const start=new Date(startDate);
        const end=new Date(endDate);
        const date=new Date(start.getTime());
        let list=[]
        while(date<=end){
            list.push(new Date(date).getTime());
            date.setDate(date.getDate()+1);
        }
        return list
    }
    const alldates=getDatesInRange(dates[0].startDate,dates[0].endDate);
    const isAvailable=(roomNumber)=>{
        const isFound=roomNumber.unavailableDates.some((date)=> 
        alldates.includes(new Date(date).getTime())
        )
        return !isFound;
    }
    const handleSelect=(e)=>{
        const checked=e.target.checked;
        const value=e.target.value;
        setSelectedRooms(
            checked ? [...selectedRooms,value]:selectedRooms.filter((item)=>item !==value)
        )
    }
    const handleClick=async()=>{
        try {
           await Promise.all(selectedRooms.map(roomId=>{
            const res=axios.put(`http://localhost:3001/api/rooms/availability/${roomId}`,{dates:alldates});
            return res.data
           }))
           setopen(false);
           navigate('/')
        } catch (error) {
            console.log(error)
        }
    }
    
    console.log(selectedRooms)
  return (
    <div className='Reserve'>
        <div className='rContainer'>
            <FontAwesomeIcon 
            icon={faCircleXmark}
            className='rClose'
            onClick={()=>setopen(false)}
            />
            <span>Select your rooms</span>
            {data.map(item=>(
                <div className='rItem'>
                    <div className='rItemInfo'>
                        <div className='rTitle'>{item.title}</div>
                        <div className='rDesc'>{item.desc}</div>
                        <div className='rMax'>Max People<b>{item.maxPeople}</b> </div>
                        <div className='rPrice'>{item.price}</div>
                    </div>
                    <div className='SelectRooms'>
                    {item.roomNumbers.map(roomNumber=>(
                        <div className='room'>
                            <label>{roomNumber.number}</label>
                            <input disabled={!isAvailable(roomNumber)} type='checkbox' value={roomNumber._id} onChange={handleSelect}></input>
                        </div>
                    ))}
                    </div>
                </div>
            ))}
            <button onClick={handleClick} className='Button'>Reserve Now!</button>
        </div>
    </div>
  )
}

export default Reserve