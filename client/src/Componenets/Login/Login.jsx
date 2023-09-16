import React, { useState,useEffect } from 'react';
import logo from '../../assets/images.png';
import axios from 'axios';
import {toast } from 'react-toastify';
import { handleToastSuccess,handleToastFailure } from '../../Toast';
import { useNavigate } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { loadingState } from '../../Context/LoadingProvider';


const Login = () => {
  const [userDetails, setUserDetails] = useState({
    username: '',
    email:'',
    password:''
  })
  const { loading, setLoading } =loadingState()

  const [signUp, setSignUp] = useState(false);

  const navigate=useNavigate()

  const handleSignUpOrLogin = () => {
    setSignUp(!signUp)
    setUserDetails({
      username: '',
      password:''
    })
  }

  const handleInputChange = (e) => {
    setUserDetails({...userDetails,[e.target.name]:e.target.value})
  }

  const handleLogin = async (e) => {
    setLoading(true)
    e.preventDefault()
    try {
     
      const config = {
        headers: {
          "Content-type":"application/json"
        }
      }
      const result = await axios.post('http://localhost:5000/user/login',
        userDetails,
        config
      );
console.log(result)
      if (result.status === 200) {
        setLoading(false)
        handleToastSuccess(`${result.data.message}`)
      setUserDetails({
        username: '',
        password:''
      })
        
        localStorage.setItem('userData',JSON.stringify(result.data))
        navigate('/app')
      }
    } catch (error) {
      console.log(error)
      setLoading(false);
     handleToastFailure(`${error.response.data}`)
    }
   
  }

  const handleSignUp = async (e) => {
    
    e.preventDefault();
    setLoading(true)
    try {
      const config = {
        headers: {
          "Content-type":"application/json"
        }
      }
      const result = await axios.post(
        'http://localhost:5000/user/register',
        userDetails,
        config
      );
      console.log(result)
      
      setLoading(false)
      userDetails({
        username: '',
        email:'',
        password:''
      })
      navigate('/')
      handleToastSuccess(`${result.data.message}`)
    } catch (error) {
      console.log(error)
      handleToastFailure(`${error.response.data}`)
    }
   

  }

  useEffect(() => {
    setLoading(true)
    const user = localStorage.getItem('userData');
    if (user) {
      setLoading(false)
      navigate('/app')
    } else {
      setLoading(false)
    }
  }, [])
  
  if (loading) {
    return (
      <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={loading}
     
    >
      <CircularProgress color="inherit" />
    </Backdrop>
    )
  
  }
  
  if (signUp) {
    return (
      <div className='login-component'>
            <div className='login-container'>
                <img src={logo} alt="logo" className='login-logo'/>
                <div className='user-login-component'>
                    <h1 className='login-heading'>SignUp</h1>
                    <div className='user-login-container'>
                      <form onSubmit={handleSignUp}>
                            <input
                                className='login-username login-input'
                                type="text"
                  placeholder='enter username'
                  name='username'
                  value={userDetails.username}
                  onChange={handleInputChange}
                />
                            <input
                                className='login-email login-input'
                                type="email"
                  placeholder='enter email'
                  name='email'
                  value={userDetails.email}
                  onChange={handleInputChange}
                            />
                            <input
                                className='login-password login-input'
                                type="password"
                  placeholder='enter password'
                  name='password'
                  value={userDetails.password}
                  onChange={handleInputChange}
                            />
                          <button type='submit' className='login-button'>SignUp</button>
                      </form>
                      
            </div>
            <p>Already have an account?<button
              className='signup-link'
            onClick={handleSignUp}
            > Login</button></p>
                </div>
          </div>
      </div>
    )
  } else {
    return (
      <div className='login-component'>
            <div className='login-container'>
                <img src={logo} alt="logo" className='login-logo'/>
                <div className='user-login-component'>
                    <h1 className='login-heading'>Login to your account</h1>
                    <div className='user-login-container'>
                      <form onSubmit={handleLogin}>
                            <input
                                className='login-username login-input'
                                type="text"
                  placeholder='enter username'
                  name='username'
                  onChange={handleInputChange}
                                value={userDetails.username}
                            />
                            <input
                                className='login-password login-input'
                                type="password"
                  placeholder='enter password'
                  name='password'
                  onChange={handleInputChange}
                                value={userDetails.password}
                            />
                          <button type='submit' className='login-button'>Login</button>
                      </form>
                      
            </div>
            <p>Don't have an account?<button
            onClick={handleSignUpOrLogin}
              className='signup-link'> SignUp</button></p>
                </div>
          </div>
      </div>
    )
  }
 
}

export default Login