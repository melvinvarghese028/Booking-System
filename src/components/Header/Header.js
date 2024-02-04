import React, { useContext, useState } from 'react'
import {faBed,faPlane,faCar,faTaxi, faCalendarDays, faPerson} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import './Header.css'
import {DateRange} from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';
import {format} from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../../context/SearchContext';
import { AuthContext } from '../../context/AuthContext';
function Header({type}) {
    const [destination,setDestination]=useState("");
    const [openDate,setopenDate]=useState(false);
    const [dates,setDates]=useState([
        {
            startDate:new Date(),
            endDate:new Date(),
            key:'selection',

        }
    ])
    const [openOptions,setOpenoptions]=useState(false);
    const [options,setOptions]=useState(
        {
            adults:1,
            children:0,
            room:1
        }
    )
    const handleoption=(name,operation)=>{
        setOptions((prev)=>{
            return{
                ...prev,
                [name]:operation === "i" ? options[name]+1 :options[name]-1,
            }
        })
    }
    const {dispatch}=useContext(SearchContext);
    const {user}=useContext(AuthContext);
    const navigate=useNavigate()
    const handlesearch=()=>{
        dispatch({type:"NEW_SEARCH",payload:{destination,dates,options}})
        navigate('/hotels',{state:{destination,dates,options}});
    }
  return (
    <div className='header'>
        <div className={type==="list" ? "headerContainer listMode":"headerContainer"}>
            <div className='headerList'>
                <div className='headerListitem'>
                <FontAwesomeIcon icon={faBed} />
                <span>Stays</span>
                </div>
                <div className='headerListitem active'>
                <FontAwesomeIcon icon={faPlane} />
                <span>Flights</span>
                </div>
                <div className='headerListitem'>
                <FontAwesomeIcon icon={faCar} />
                <span>Car Rentals</span>
                </div>
                <div className='headerListitem'>
                <FontAwesomeIcon icon={faBed} />
                <span>All Attractions</span>
                </div>
                <div className='headerListitem'>
                <FontAwesomeIcon icon={faTaxi} />
                <span> Airport Taxis</span>
                </div>
            </div>
            {type !== "list" &&
            <>
            <h1 className='headerTitle'>A lifetime of discounts? It's Genius.</h1>
            <p className='headerDoc'>
            Get Rewarderd for your travels Unlock instant savings for 10% or money
            with a free Lambooking account
            </p>
           {!user && <button className='headerButton'>Sign in/Register</button>}
            <div className='headerSearch'>
                 <div className='headerSearchitem'>
                    <FontAwesomeIcon icon={faBed} className='headerIcon'/>
                    <input 
                    onChange={e=>setDestination(e.target.value)}
                    type='text' 
                    placeholder='Where are you going' 
                    className='headerSearchinput'>
                    </input>
                </div>
                <div className='headerSearchitem'>
                    <FontAwesomeIcon icon={faCalendarDays} className='headerIcon'/>
                    <span onClick={()=>setopenDate(!openDate)} className='headerSearchText'>{`${format(dates[0].startDate,"MM/dd/yyyy")}  to ${format(dates[0].endDate,"MM/dd/yyyy")}` }</span>
                    {openDate && <DateRange
                    editableDateInputs={true}
                    onChange={item => setDates([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    className='Date'/>}
                </div>
                <div className='headerSearchitem'>
                    <FontAwesomeIcon icon={faPerson} className='headerIcon'/>
                    <span onClick={()=>setOpenoptions(!openOptions)} className='headerSearchText'>{`${options.adults} adults . ${options.children} children . ${options.room} room`}</span>
                    {openOptions && <div className='options'>
                        <div className='optionsItem'>
                            <span className='optiontext'>Adult</span>
                            <div className='optionCounter'>
                                <button disabled={options.adults<=1} className='optionCounterButton' onClick={()=>handleoption("adults","d")}>-</button>
                                <span className='optionCounterNumber'>{options.adults}</span>
                                <button className='optionCounterButton' onClick={()=>handleoption("adults","i")}>+</button>
                            </div>
                        </div>
                        <div className='optionsItem'>
                            <span className='optiontext'>Children</span>
                            <div className='optionCounter'>
                                <button disabled={options.children<=0} className='optionCounterButton' onClick={()=>handleoption("children","d")}>-</button>
                                <span className='optionCounterNumber'>{options.children}</span>
                                <button className='optionCounterButton' onClick={()=>handleoption("children","i")}>+</button>
                            </div>
                        </div>
                        <div className='optionsItem'>
                            <span className='optiontext'>Room</span>
                            <div className='optionCounter'>
                                <button disabled={options.room<=1} className='optionCounterButton' onClick={()=>handleoption("room","d")}>-</button>
                                <span className='optionCounterNumber'>{options.room}</span>
                                <button className='optionCounterButton' onClick={()=>handleoption("room","i")}>+</button>
                            </div>
                        </div>

                    </div>}
                </div>
                <div className='headerSearchitem'>
                    <button className='headerButton' onClick={handlesearch}>Search</button>

                </div>
            </div></>}
        </div>
    </div>
  )
}

export default Header