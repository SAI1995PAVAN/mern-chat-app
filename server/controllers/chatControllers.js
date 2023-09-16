const expressAsyncHandler = require('express-async-handler');
const ChatModel = require('../models/chatModel');
const UserModel = require('../models/userModel');

const accessChat = expressAsyncHandler(async (req, res) => {
    const {userId} = req.body;
   
    if (!userId) {
        return res.status(400)
    }

    let chatDetails = await ChatModel.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: req.userId } } }
        ]
    }).populate("users", "-password").populate("latestMessage")

    console.log(chatDetails)

chatDetails = await UserModel.populate(chatDetails, {
    path: "latestMessage.sender",
    select:"name email"
    })

    if (chatDetails > 0) {
       return res.send(chatDetails[0])
    } else {
        let newChatData = {
            chatName: 'sender',
            isGroupChat: false,
            users:[req.user._id,userId]
        }
        try {
            const createdChat = await ChatModel.create(newChatData);
            const fullChat = await ChatModel.findOne({
                _id: createdChat._id
            }).populate("users", "-password");
            return res.status(201).send(fullChat)
        } catch (error) {
            console.log(error,'-------------------access chat error-------------------')
        }
    }

});


const fetchChats = expressAsyncHandler(async (req, res) => {
    try {
        const filteringUsers=await ChatModel.find({ users: { $elemMatch: req.user._id } })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
            .populate("latestMessage")
            .sort({ updatedAt: -1 })
        const filteredUsers = await UserModel.populate(filteringUsers, {
            path: "latestMessage.sender",
          select: "name email",
        })
        res.status(200).send(filteredUsers)
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
})

// const createGroup = expressAsyncHandler(async (req, res) => {
//     if (!req.body.users || !req.body.name) {
//         return res.status(400).send({ message: "Data is insufficient" });
//       }
    
//       let users = JSON.parse(req.body.users);
//       console.log("chatController/createGroups : ", req);
//       users.push(req.user);
    
//       try {
//         const groupChat = await Chat.create({
//           chatName: req.body.name,
//           users: users,
//           isGroupChat: true,
//           groupAdmin: req.user,
//         });
    
//         const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
//           .populate("users", "-password")
//           .populate("groupAdmin", "-password");
    
//         res.status(200).json(fullGroupChat);
//       } catch (error) {
//         res.status(400);
//         throw new Error(error.message);
//       }
// })

// const fetchGroups = expressAsyncHandler(async (req, res) => {
//     try {
//         const allGroups = await Chat.where("isGroupChat").equals(true);
//         res.status(200).send(allGroups);
//     } catch (error) {
//         res.status(400);
//         throw new Error(error.message);
//   }
// })

// const groupExit = expressAsyncHandler(async (req, res) => {
//     const { chatId, userId } = req.body;

//   // check if the requester is admin

//   const removed = await Chat.findByIdAndUpdate(
//     chatId,
//     {
//       $pull: { users: userId },
//     },
//     {
//       new: true,
//     }
//   )
//     .populate("users", "-password")
//     .populate("groupAdmin", "-password");

//   if (!removed) {
//     res.status(404);
//     throw new Error("Chat Not Found");
//   } else {
//     res.json(removed);
//   }
// })

// const addSelfToGroup = expressAsyncHandler(async (req, res) => {
//     const { chatId, userId } = req.body;
//     const added = await ChatModel.findByIdAndUpdate(chatId, {
//         $push: { users: userId },
//         new: true
//     }).populate("users", "-password").populate("groupAdmin", "-password");

//     if (!added) {
//         res.status(400);
//         throw new Error('Chat not found')
//     } else {
//         res.json(added)
//     }
// })

module.exports = {
    accessChat,
    fetchChats,
    // createGroup,
    // fetchGroups,
    // groupExit,
    // addSelfToGroup
}