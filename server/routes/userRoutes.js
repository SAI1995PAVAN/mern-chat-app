const express = require('express');

const router = express.Router();
const {loginController,registerController, fetchAllUsersController}=require('../controllers/userControllers.js')
const { routeProtection } = require('../middleware/authMiddleware');





router.post('/login', loginController);
router.post('/register', registerController);
router.get('/fetchUsers',routeProtection,fetchAllUsersController)

module.exports=router