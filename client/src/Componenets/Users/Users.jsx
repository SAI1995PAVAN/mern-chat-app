import React, { useState } from 'react'
import '../MyStyles/MyStyles.css';
import SearchIcon from '@mui/icons-material/Search';
import livechat from '../../assets/live-chat.png';
import { IconButton } from '@mui/material';
import EachOnlineUser from '../EachOnlineUser/EachOnlineUser';
import { AnimatePresence } from 'framer-motion';
import {motion} from 'framer-motion'
import { useEffect } from 'react';
import { loadingState } from '../../Context/LoadingProvider';
import axios from 'axios';
import { handleToastSuccess,handleToastFailure } from '../../Toast';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';

const Users = () => {
    const navigate=useNavigate()
    const [onlineUsers, setOnlineUsers] = useState([
        // {
        //     name:"User1"
        // },
        // {
        //     name:"User2"
        // },
        // {
        //     name:"User3"
        // }
        // , {
        //     name:"User4"
        // },
        // {
        //     name:"User5"
        // }
    ])
    const { loading, setLoading } = loadingState();
    const loggedInUser = JSON.parse(localStorage.getItem('userData'))
    
    if (!loggedInUser) {
        navigate('/')
    }

    const fetchAllUsers = async() => {
        setLoading(true);
        try {
            const config={
                headers: {
                    authorization:`Bearer ${loggedInUser.token}`
                }
            }
            let result = await axios.get('http://localhost:5000/user/fetchUsers',config);
            console.log(result)

            setLoading(false)
            setOnlineUsers([...result.data])
            console.log(onlineUsers)
            handleToastSuccess('Users fetched')
        } catch (error) {
            setLoading(false)
            console.log(error.response.data)
            handleToastFailure(`${error.response.data}`)
        }
    }
    
    const handleChatClick = async (userId) => {
        console.log('clicked')
        const config = {
            headers: {
                authorization:`Bearer ${loggedInUser.token}`
            }
        }
        try {
        const result=await axios.post('http://localhost:5000/chat/', { userId: userId }, config);
        // console.log(result)
        navigate('/app/chat') 
        } catch (error) {
            console.log(error)
        }
       
    }

    useEffect(() => {
        fetchAllUsers()
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

    return (
      <AnimatePresence>
            

            <motion.div
                 initial={{ opacity: 0, scale: 0 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 0 }}
                 transition={{
                     duration:"0.3"
                 }}
                className='users-groups-component'>
          <div className='users-groups-container'>
              <div className='online-users-header'>
                  <img src={livechat} alt="live-chat" className='online-users-logo' />
                  <p>Online Users</p>
              </div>
              <div className='online-users-search'>
                  <IconButton>
                      <SearchIcon />
                  </IconButton>
                  <input
                      type="text"
                      placeholder='search users and groups'
                      className='online-users-input'
                      
                  />
              </div>
              <div className='online-users-container'>
                {onlineUsers.length>0?onlineUsers.map((user, index) => {
                    return <EachOnlineUser
                        userDetails={user}
                        key={index}
                        onClick={()=>{handleChatClick(user._id)}}
                    />
                }) : (
                            <h2>No users</h2>)}
                  
              </div>
          </div>
            </motion.div>
            </AnimatePresence>
  )
}

export default Users