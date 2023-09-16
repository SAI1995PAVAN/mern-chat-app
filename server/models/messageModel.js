const mongoose = require('mongoose');
const chatModel=require('./chatModel')

const messageSchema = mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      content: {
        type: String,
        trim: true,
      },
      reciever: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
      },
}, {
    timeStamps:true
})

const Message = mongoose.model("Message", messageSchema);

module.exports=Message