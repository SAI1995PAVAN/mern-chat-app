const expressAsyncHandler = require('express-async-handler');
const ChatModel = require('../models/chatModel');
const UserModel = require('../models/userModel');
const MessageModel = require('../models/messageModel')

const allMessages = expressAsyncHandler(async (req, res) => {
    const { chatId } = req.params;
   try {
       const messages = await MessageModel.find({ chat: chatId }
       ).populate("sender", "name email")
           .populate("reciever")
           .populate("chat")
       res.status(200).json(messages)
   } catch (error) {
       console.log(error);
       res.status(400)
       throw new Error(error.message)
   }
})

const sendMessage = expressAsyncHandler(async (req, res) => {
    const { content, chatId } = req.body;
    if (!content || !chatId) {
        return res.status(400).json("invalid data passed")
    }

    let newMessage = {
        sender: req.user._id,
        content,
        chat:chatId
    }

    try {
        let finalMessage = await MessageModel.create(newMessage)
            .populate("sender", "name email")
            .populate("chat")
            .populate("reciever")
        finalMessage = await UserModel.populate(message, {
            path: "chat.users",
            select:"name email"
        })

        await ChatModel.findByIdAndUpdate(chatId, { latestMessage: finalMessage });
        res.json(finalMessage)
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
})

module.exports={}