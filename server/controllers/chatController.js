const express = require('express');

const {Chat} = require ("../models/Chat");

const createChat = async (req,res)=>{
  console.log("from create chat")
 const {firstId,secondId}= req.body
 console.log(req.body.firstId)
 try{
    const chat = await Chat.findOne({members:{$all: [ firstId , secondId ]}});
    if(chat){
      return res.status(200).json(chat)
    }
    const newChat = new Chat({ members: [firstId,secondId]})
    let result = await newChat.save();
    res.status(200).json(result)
    console.log("new chat")
 }
 catch(error){
    res.status(500).json(error)
   console.log(error)
 }

}

const findUserChats = async (req,res)=>{
    const userId = req.params.userId;
    try{
       const chats = await Chat.find({members:{$in: [userId]}});

       res.status(200).json(chats)
    }
    catch(error){
        res.status(500).json(error)
       console.log(error)
     }
   
   }

   const findChat = async (req,res)=>{
    const {firstId,secondId} = req.params;
    try{
       const chats = await Chat.findOne({members:{$all: [ firstId , secondId ]}});

       res.status(200).json(chats)
    }
    catch(error){
        res.status(500).json(error)
       console.log(error)
     }
   
   }
   module.exports = {
    findChat, findUserChats ,createChat
}