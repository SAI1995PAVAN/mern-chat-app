import React from 'react'
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import { IconButton } from '@mui/material';
import '../MyStyles/MyStyles.css';
import { AnimatePresence,motion } from 'framer-motion';

const CreateGroups = () => {
    return (
        <AnimatePresence>
            <motion.div
                className='create-group-component'
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{
                    duration:"0.3"
                }}
            >
            <div className='create-group-container'>
                <input placeholder='enter group name' type="text" className='create-group-input' />
                <IconButton>
                    <DoneOutlineIcon />
                </IconButton>
            </div>
            </motion.div>
            </AnimatePresence>
  )
}

export default CreateGroups