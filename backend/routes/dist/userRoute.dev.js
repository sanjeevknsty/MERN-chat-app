"use strict";

var express = require("express");

var _require = require('express-validator'),
    body = _require.body;

var _require2 = require("../controllers/userRegister"),
    userSignup = _require2.userSignup,
    userLogin = _require2.userLogin,
    searchUser = _require2.searchUser;

var authToken = require("../middleware/authToken");

var router = express.Router();
router.post('/signup', [body('name', "Enter Valid Name").isLength({
  min: 3
}), body('email', "Enter Valid Name").isEmail(), body('password', "Enter Valid Password").isLength({
  min: 3
})], userSignup);
router.post('/login', userLogin);
router.get('/search', authToken, searchUser);
module.exports = router;