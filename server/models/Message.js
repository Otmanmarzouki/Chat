const mongoose = require("mongoose");



const MessageSchema = new mongoose.Schema({
    receiverId: String,
    senderId:String,
    text:String,
    
},
{
timestamps:true

});

  const Message = mongoose.model("message",MessageSchema );

  module.exports = { Message };
