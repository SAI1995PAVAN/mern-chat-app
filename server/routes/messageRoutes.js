const express = require('express');

const router = express.Router();

const { routeProtection } = require('../middleware/authMiddleware');


router.get('/:chatId', routeProtection, allMessages)
router.post('/', routeProtection, sendMessage)


module.exports=router