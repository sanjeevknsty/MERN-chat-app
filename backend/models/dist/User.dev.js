"use strict";

var _require = require("@testing-library/user-event/dist/type"),
    type = _require.type;

var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  profilePicture: {
    type: String,
    "default": "https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg"
  }
}, {
  Timestamp: true
});
var userModel = mongoose.model("user", userSchema);
module.exports = userModel;