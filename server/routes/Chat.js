const express = require('express');
const router = express.Router();
const { findChat,findUserChats,createChat} = require("../controllers/chatController");

router.post("/createChat" ,createChat);
router.get("/chats/:userId" ,findUserChats);
router.get("/chat/:firstId/:secondId" ,findChat);

module.exports = router ;