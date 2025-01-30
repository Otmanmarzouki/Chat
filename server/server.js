const app = require("./app")
const mongoose = require("mongoose");
const {Server} = require("socket.io")

app.listen(8080,()=>{
  console.log("hello")
})
mongoose.connect("mongodb://0.0.0.0:27017/usersdb", {

}); 
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});





const io = new Server(5050, {  cors: "http://localhost:8080/"});

  console.log("hii from socket ")

  const {Message} = require ("./models/Message");
  const {User} = require ("./models/User");


  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);
    User.find().then((res)=>{
      socket.emit("users",res)
    })
   
    socket.on('sendmessage', (data) => {
    console.log('Received message:', data);
  const message = new Message({ receiverId:data.receiverId ,senderId: data.senderId, text: data.text });
      message.save()
    });
    
   // WHEN CLICK ON RESERVER SHOWS MESSAGES 
   socket.on("getConversation", ({ senderId, receiverId }) => {
   
      Message.find({
        $or: [
          { senderId: senderId, receiverId: receiverId },
          { senderId: receiverId, receiverId: senderId },
        ],
    
    }).then((messages) => {
      socket.emit("Conversation", messages);
    }).catch((error) => {
      console.error("Error fetching messages:", error);
    });
  });
  
// show all messages 
     

     
   
    
  
    // Listen for user disconnection
   
  });

module.exports= app