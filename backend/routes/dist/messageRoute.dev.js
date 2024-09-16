"use strict";

var express = require("express");

var authToken = require("../middleware/authToken");

var _require = require("../controllers/messageControllers"),
    chatMessage = _require.chatMessage,
    allMessages = _require.allMessages;

var router = express.Router();
router.post('/', authToken, chatMessage);
router.get('/:chatId', authToken, allMessages);
module.exports = router;