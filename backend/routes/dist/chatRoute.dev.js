"use strict";

var express = require("express");

var authToken = require("../middleware/authToken");

var _require = require("../controllers/chatController"),
    accesschat = _require.accesschat,
    fetchchats = _require.fetchchats,
    groupChat = _require.groupChat,
    rename = _require.rename,
    addUserToGroup = _require.addUserToGroup,
    deleteUser = _require.deleteUser;

var router = express.Router();
router.post('/', authToken, accesschat);
router.get('/', authToken, fetchchats);
router.post("/groupchat", authToken, groupChat);
router.put("/rename", authToken, rename);
router.put("/adduser", authToken, addUserToGroup);
router.put("/deleteuser", authToken, deleteUser);
module.exports = router;