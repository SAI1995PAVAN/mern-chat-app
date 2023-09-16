// importing third party libraries
const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose=require('mongoose')
const userRoutes=require('./routes/userRoutes.js')
const chatRoutes=require('./routes/chatRoutes.js')
// importing in app modules
const connectToDb=require('./config/database.js')

// running app

const app=express()
dotenv.config()
// running middleware functions
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); 




app.use('/user', userRoutes)
app.use('/chat',chatRoutes)

app.use((err, req, res, next) => {
  
    if (res.statusCode) {
        return res.json(err.message)
    } else {
        return res.statusCode(500).json(err.message)
    }
})

// server running
const port = process.env.PORT || 6001;

connectToDb().then(() => {
    app.listen(port, () => {
       console.log(`server is running on ${port}`)
    })
}).catch((error) => {
    console.log(error)
})

