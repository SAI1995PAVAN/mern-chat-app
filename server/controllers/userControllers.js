const express=require('express')
const UserModel = require('../models/userModel.js');
const expressAsyncHandler = require('express-async-handler');
const generateToken = require('../config/token.js');


// console.log(UserModel)

const loginController = expressAsyncHandler(async(req, res) => {
    const { username, password } = req.body
    console.log(username, password)
    try {
        const user = await UserModel.findOne({ username })
        console.log(user, '--------------loginController-----------------');
        if (user && await user.matchPassword(password)) {
            return res.status(200).json({
                message: 'Login successful',
                _id:user._id,
                name: user.username,
                email:user.email,
                isAdmin: user.isAdmin,
                token:generateToken(user._id)
           })
        } else {
            res.status(401)
            throw new Error('Invalid user credentials');
    
        }
    } catch (error) {
        console.log(error);
        throw new Error('Invalid user credentials');
    }
   

    
})

const registerController = expressAsyncHandler(async(req, res) => {
    const { username, email, password } = req.body;

    // All input fields are entered
    if (!username || !password || !email) {
        res.status(400)
        throw new Error('Please enter all required input fields')
    }

    // In case user already exists
    const userEmailExists =await UserModel.findOne({email});
    if (userEmailExists) {
        res.status(400)
        throw new Error('User already exists, use another email')
    }

    // username already exists
    const userNameExists =await UserModel.findOne({username});
    if (userNameExists) {
        res.status(400)
        throw new Error('Username already taken use another name')
    }

    // user satisfied requirements adding him/her to database
    const user = await UserModel.create({ username, email, password });
    
    if (user) {
        return res.status(201).json({
            message: `user registration successful of user ${user.email}`,
            _id: user._id,
            name: user.username,
            email: user.emial,
            isAdmin: user.isAdmin,
            token:generateToken(user._id)
        }) 
    } else {
       res.status(400)
       throw new Error('Registration failed')
    }
   

})

const fetchAllUsersController = expressAsyncHandler(async (req, res, next) => {
    console.log(req.user)
    const searchWord = req.query.search ? {
        $or: [
            { name: { $regex: req.query.search, $options: 'i' } },
            {email:{$regex:req.query.search,$options:'i'}}
        ]
    } : {};
    try {
        const users = await UserModel.find(searchWord).find({ _id: { $ne: req.user._id } }).select("-password")
        console.log(users)
        return res.send(users)
    } catch (error) {
        console.log(error);
        return error
    }
   
})

module.exports={loginController,registerController,fetchAllUsersController}

