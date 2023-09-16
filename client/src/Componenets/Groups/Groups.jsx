import React, { useState } from 'react'
import '../MyStyles/MyStyles.css';
import SearchIcon from '@mui/icons-material/Search';
import livechat from '../../assets/live-chat.png';
import { IconButton } from '@mui/material';
import EachOnlineUser from '../EachOnlineUser/EachOnlineUser';
import { AnimatePresence } from 'framer-motion';
import {motion} from 'framer-motion'

const Groups= () => {
    const [onlineUsers, setOnlineUsers] = useState([
        {
            name:"Group1"
        },
        {
            name:"Group2"
        },
        {
            name:"Group3"
        }
        , {
            name:"Group4"
        },
        {
            name:"Group5"
        }
    ])
    return (
      <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{
                    duration:"0.3"
                }}
                className='users-groups-component'
            >
          <div className='users-groups-container'>
              <div className='online-users-header'>
                  <img src={livechat} alt="live-chat" className='online-users-logo' />
                  <p>Online Groups</p>
              </div>
              <div className='online-users-search'>
                  <IconButton>
                      <SearchIcon />
                  </IconButton>
                  <input
                      type="text"
                      placeholder='search groups'
                      className='online-users-input'
                      
                  />
              </div>
              <div className='online-users-container'>
                  {onlineUsers.map((user, index) => {
                      return <EachOnlineUser userDetails={user} key={index}  />
  })}
                  
              </div>
          </div>
    </motion.div>
      </AnimatePresence>
     
  )
}

export default Groups