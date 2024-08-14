"use strict";

var mongoose = require("mongoose");

var messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  content: {
    type: String,
    trim: true
  },
  chat: {
    type: mongoose.Schema.ObjectId,
    ref: "chat"
  }
});
var messageModel = mongoose.model("message", messageSchema);
module.exports = messageModel;