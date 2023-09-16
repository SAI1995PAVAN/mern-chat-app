import React from 'react'
import ChatArea from '../ChatArea/ChatArea';
import '../MyStyles/MyStyles.css'
import Sidebar from '../Sidebar/Sidebar';
import Welcome from '../Welcome/Welcome';
import CreateGroups from '../CreateGroups/CreateGroups';
import Users from '../Users/Users';
import { Outlet } from 'react-router-dom';
import { themeState } from '../../Context/ThemeProvider';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MainContainer = () => {
  const { theme, setTheme } = themeState();
  const user = JSON.parse(localStorage.getItem('userData'));
  // console.log(user)
  const navigate=useNavigate('')
  useEffect(() => {
    if (!user) {
      navigate('/')
    }
  },[])
  return (
      <div className={theme===true?'main-container dark':'main-container'}>
        <Sidebar />
        <Outlet />
      </div>
  )
}

export default MainContainer