const express = require('express');
const router = express.Router();

const { getMessages } = require('../controllers/messageController');

router.post("/createMessage" ,createChat);
router.get("/chats/:userId" ,getMessages);
router.get("/chat/:firstId/:secondId" ,findChat);

module.exports = router ;