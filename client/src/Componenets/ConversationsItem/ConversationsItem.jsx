import React from 'react'
import { useNavigate } from 'react-router-dom';
import '../MyStyles/MyStyles.css';
import { motion } from 'framer-motion';

const ConversationsItem = ({ props }) => {
 
  const navigate=useNavigate()
  return (
    <motion.div
      className='conversations-container'
      
      whileTap={{scale:0.98}}
    >
        <p className='conversations-icon'>{ `${props.name[0]}`}</p>
        <p className='conversations-title'>{props.name}</p>
        <p className='conversations-lastmessage'>{ props.lastMessage}</p>
        <p className='conversations-timestamp'>{props.timestamp}</p>
    </motion.div>
  )
}

export default ConversationsItem