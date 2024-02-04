import React from 'react'
import './Maillist.css'
function Maillist() {
  return (
    <div className='mail'>
        <h1 className='mailTitle'>Save time,save money</h1>
        <span className='mailDesc'>Signup and we will send</span>
        <div className='mailInputContainer'>
            <input type='text' placeholder='Your Email'/>
            <button>Subscribe</button>
        </div>
    </div>
  )
}

    export default Maillist