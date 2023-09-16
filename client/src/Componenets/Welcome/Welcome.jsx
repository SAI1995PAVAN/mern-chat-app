import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import livechat from '../../assets/images.png';



const Welcome = () => {
  const navigate=useNavigate()
  const user = JSON.parse(localStorage.getItem('userData'));
  console.log(user,'---------welcome.jsx--------------------');


  useEffect(() => {
    if (!user) {
      navigate('/')
    }
  }, [user])
  
  return (
    <div className='welcome-component'>
      
        <img src={livechat} alt="livechat" className='welcome-logo' />
      <p>{ `Welcome to chat app Mr/Ms ${user.name}`}</p>
      
    </div>
  )
}

export default Welcome