import React, { useContext } from 'react'
import './Navbar.css'
import {Link} from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
function Navbar() {
  const {user}=useContext(AuthContext)
  return (
    <div className='navbar'>
        <div className='navbarContainer'>
            <Link to='/' style={{color:'inherit',textDecoration:"none"}}>
            <span className='logo'>Lambooking</span>
            </Link>
            {user ?user.username :( <div className='navItems'>
                <button className='navButton'>Register</button>
                <button className='navButton'>Login</button>
            </div>)}
        </div>
    </div>
  )
}

export default Navbar