const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const expressAsyncHandler = require('express-async-handler');

const routeProtection = expressAsyncHandler(async(req, res, next) => {
    let token;
    
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    )
    {
        try {
            token = req.headers.authorization.split(' ')[1];
            console.log(token)
            const decoded = jwt.verify(token, process.env.jwtSecretKey);

            req.user = await User.findById(decoded.id)
            next()
        } catch (error) {
            res.status(401);
            throw new Error('Not authorized to access this route')
        }
    } else {
        throw new Error('Not authorized to access this route')
    }
})

module.exports = {routeProtection};