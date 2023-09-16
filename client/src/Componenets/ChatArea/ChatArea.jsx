import React,{useEffect, useState} from 'react'
import '../MyStyles/MyStyles.css'
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import MessageOthers from './MessageOthers';
import MessageSelf from './MessageSelf';
import { motion,AnimatePresence } from 'framer-motion';


const ChatArea = () => {
  const [data,setData] = useState({
    name: 'Test1',
    timeStamp:'today'
  })

  const fetchChatArea = () => {
    
  }

  useEffect(() => {
    
  },[])
  return (
    <AnimatePresence>
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{
          duration:"0.3"
      }}
        className='chatarea-container '>
        <div className='chatarea-header chat-area-components'>
          <p className='icon'>{ data.name[0].toUpperCase()}</p>
          <p className='name'>{ data.name}</p>
          <p className='timestamp'>{data.timeStamp}</p>
          <IconButton className='delete-button'>
            <DeleteIcon />
          </IconButton>
          </div>
      <div className='chatarea-messages chat-area-components'>
        <MessageOthers />
        <MessageSelf />
        <MessageOthers />
        <MessageSelf />
        <MessageOthers />
        <MessageSelf />
        <MessageOthers />
        <MessageSelf />
        <MessageOthers />
        <MessageSelf />
          </div>
      <div className='chatarea-input chat-area-components'>
        <input placeholder='Start Chatting' className='input' />
        <IconButton className='send-messages'>
            <SendIcon className='send-icon'/>
        </IconButton>
          </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default ChatArea