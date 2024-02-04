import React, {  useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios';
import './Login.css'
import { useNavigate } from 'react-router-dom';
function Login() {
    const [credentials,setCredentials]=useState({
        username:undefined,
        password:undefined
    })
    const {loading,error,dispatch}=useContext(AuthContext);
    const navigate=useNavigate();
    const handleChange=(e)=>{
        setCredentials(prev=>({...prev,[e.target.id]:[e.target.value]}));
    }
    const handleClick=async (e)=>{
        e.preventDefault();
        dispatch({type:"LOGIN_START"});
        try {
            console.log(credentials.username)
            const res=await axios.post("http://localhost:3001/api/auth/login",{username:`${credentials.username}`,password:`${credentials.password}`});
            dispatch({type:"LOGIN_SUCCESS",payload:res.data})
            navigate('/')
        } catch (error) {
            dispatch({type:"LOGIN_FAILURE",payload:error.response.data})
        }
        
    }
  return (
    <div className='login'>
        <div className='lContainer'>
            <input type='text' placeholder='username' id="username" onChange={handleChange} className='input'/>
            <input type='password' placeholder='password' id="password" onChange={handleChange} className='input'/>
            <button disabled={loading} className='lButton' onClick={handleClick}>Login</button>
            {error && <span>{error.message}</span>}
        </div>
    </div>
  )
}

export default Login