const express = require('express');

const router = express.Router();
const {
    accessChat,
    fetchChats,
    createGroup,
    fetchGroups,
    groupExit,
    addSelfToGroup} = require('../controllers/chatControllers');
    const { routeProtection } = require('../middleware/authMiddleware');

router.post('/',routeProtection, accessChat);
router.get('/',routeProtection, fetchChats)
// router.post('/createGroup',routeProtection,createGroup)
// router.get('/fetchGroups',routeProtection, fetchGroups)
// router.put('/groupExit',routeProtection, groupExit)
// router.put('/addSelfToGroup',routeProtection,addSelfToGroup)

module.exports=router