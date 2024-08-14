"use strict";

var _require = require("@testing-library/user-event/dist/type"),
    type = _require.type;

var mongoose = require("mongoose");

var _require2 = require("./User"),
    schema = _require2.schema;

var chatSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true
  },
  isGroup: {
    type: Boolean,
    "default": false
  },
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  }],
  latestMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "message"
  },
  groupAdmin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  }
}, {
  timestamps: true
});
var chatModel = mongoose.model("chat", chatSchema);
module.exports = chatModel;