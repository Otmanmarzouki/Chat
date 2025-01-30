const mongoose = require("mongoose");



const ChatSchema = new mongoose.Schema({
    members: Array,
},
{
    timestamps: true,
});

  const Chat = mongoose.model("chat",ChatSchema );

  module.exports = { Chat };
