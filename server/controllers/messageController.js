

const {Message} = require ("../models/Message");






const createMessage = async (req,res)=>{
  console.log("from create Message")
 const {chatId,senderId,text}= req.body
 console.log(req.body.firstId)
 try{
    const newMessage = new Message({ chatId,senderId,text})
    let result = await newMessage.save();
    res.status(200).json(result)
    console.log("new message")
 }
 catch(error){
    res.status(500).json(error)
   console.log(error)
 }

}

const getMessages = async (req,res)=>{
    const {chatId} = req.params;
    try{
       const messages = await Message.find({chatId});

       res.status(200).json(messages)
    }
    catch(error){
        res.status(500).json(error)
       console.log(error)
     }
   
   }

  
   module.exports = {
    createMessage,getMessages
}