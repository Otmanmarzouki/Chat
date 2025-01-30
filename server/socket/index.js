// socket.js
const { Server } = require("socket.io");
const { Message } = require("../models/Message");
const { User } = require("../models/User");

const socketServer = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:8080", // Update with your frontend's origin
    },
  });

  let onlineUsers = [];

  const addOnlineUser = (userId, socketId) => {
    if (!onlineUsers.some((user) => user.userId === userId)) {
      onlineUsers.push({ userId, socketId });
    }
  };

  const removeOnlineUser = (socketId) => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
  };

  const getUserSocketId = (userId) => {
    const user = onlineUsers.find((user) => user.userId === userId);
    return user?.socketId;
  };

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Emit all users when a client connects
    User.find()
      .then((users) => {
        socket.emit("users", users);
      })
      .catch((err) => console.error("Error fetching users:", err));

    // Handle sending messages
    socket.on("sendmessage", async (data) => {
      try {
        const message = new Message({
          receiverId: data.receiverId,
          senderId: data.senderId,
          text: data.text,
        });

        const savedMessage = await message.save();
        const senderSocketId = getUserSocketId(data.senderId);
        const receiverSocketId = getUserSocketId(data.receiverId);

        // Notify sender
        if (senderSocketId) {
          io.to(senderSocketId).emit("newMessage", savedMessage);
        }

        // Notify receiver
        if (receiverSocketId) {
          io.to(receiverSocketId).emit("newMessage", savedMessage);
        }

        console.log("Message saved and emitted:", savedMessage);
      } catch (err) {
        console.error("Error handling sendmessage:", err);
      }
    });

    // Fetch conversation between two users
    socket.on("getConversation", async (data) => {
      const { senderId, receiverId } = data;
      try {
        const messages = await Message.find({
          $or: [
            { senderId, receiverId },
            { senderId: receiverId, receiverId: senderId },
          ],
        });
        socket.emit("conversation", messages);
      } catch (err) {
        console.error("Error fetching conversation:", err);
        socket.emit("ConversationError", { message: "Failed to fetch conversation" });
      }
    });

    // Fetch all conversations
    socket.on("getAllConversations", async () => {
      try {
        const conversations = await Message.find();
        socket.emit("Conversations", conversations);
      } catch (err) {
        console.error("Error fetching all conversations:", err);
        socket.emit("ConversationsError", { message: "Failed to fetch all conversations" });
      }
    });

    // Handle adding a new user to the online list
    socket.on("addNewUser", (userId) => {
      addOnlineUser(userId, socket.id);
      console.log("Online Users:", onlineUsers);
      io.emit("getOnlineUser", onlineUsers);
    });

    // Handle user disconnect
    socket.on("disconnect", () => {
      removeOnlineUser(socket.id);
      console.log("User disconnected:", socket.id);
      io.emit("getOnlineUser", onlineUsers);
    });
  });
  };
   
  
 

module.exports = socketServer;
