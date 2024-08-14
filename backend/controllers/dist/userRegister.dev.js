"use strict";

var userModel = require("../models/User");

var asyncHandler = require('express-async-handler');

var generateToken = require("../generateToken");

var bycrpt = require("bcryptjs");

var createError = require('http-errors');

var userSignup = asyncHandler(function _callee(req, res, next) {
  var _req$body, email, password, name, profilePticture, userExists, salt, securePassword, user, token;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, email = _req$body.email, password = _req$body.password, name = _req$body.name, profilePticture = _req$body.profilePticture;
          console.log(email, password);

          if (!(!email || !password || !name)) {
            _context.next = 4;
            break;
          }

          return _context.abrupt("return", next('400', "Enter Valid Credentials"));

        case 4:
          _context.prev = 4;
          _context.next = 7;
          return regeneratorRuntime.awrap(userModel.findOne({
            email: email
          }));

        case 7:
          userExists = _context.sent;

          if (userExists) {
            _context.next = 22;
            break;
          }

          _context.next = 11;
          return regeneratorRuntime.awrap(bycrpt.genSalt(10));

        case 11:
          salt = _context.sent;
          _context.next = 14;
          return regeneratorRuntime.awrap(bycrpt.hash(password, salt));

        case 14:
          securePassword = _context.sent;
          _context.next = 17;
          return regeneratorRuntime.awrap(userModel.create({
            email: email,
            password: securePassword,
            name: name,
            profilePticture: profilePticture
          }));

        case 17:
          user = _context.sent;
          token = generateToken(user._id);
          return _context.abrupt("return", res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            pic: user.pic,
            token: token
          }));

        case 22:
          return _context.abrupt("return", next(createError('400', "User Exists")));

        case 23:
          _context.next = 28;
          break;

        case 25:
          _context.prev = 25;
          _context.t0 = _context["catch"](4);
          return _context.abrupt("return", next(createError('500', _context.t0.message)));

        case 28:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[4, 25]]);
});
var userLogin = asyncHandler(function _callee2(req, res, next) {
  var _req$body2, email, password, userExists, verifyPassword, token, data;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
          console.log(email, password);
          _context2.prev = 2;
          _context2.next = 5;
          return regeneratorRuntime.awrap(userModel.findOne({
            email: email
          }));

        case 5:
          userExists = _context2.sent;

          if (!userExists) {
            _context2.next = 17;
            break;
          }

          _context2.next = 9;
          return regeneratorRuntime.awrap(bycrpt.compare(password, userExists.password));

        case 9:
          verifyPassword = _context2.sent;

          if (verifyPassword) {
            _context2.next = 12;
            break;
          }

          return _context2.abrupt("return", next(createError(400, "Wrong Password")));

        case 12:
          token = generateToken(userExists._id);
          data = {
            _id: userExists._id,
            name: userExists.name,
            email: userExists.email,
            isAdmin: userExists.isAdmin,
            pic: userExists.pic,
            token: token
          };
          return _context2.abrupt("return", res.status(200).send(data));

        case 17:
          return _context2.abrupt("return", next(createError('400', "User Does Not Exists")));

        case 18:
          _context2.next = 24;
          break;

        case 20:
          _context2.prev = 20;
          _context2.t0 = _context2["catch"](2);
          console.log("error");
          return _context2.abrupt("return", next(createError('500', "user not in data base")));

        case 24:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[2, 20]]);
});
var searchUser = asyncHandler(function _callee3(req, res, next) {
  var searchName, user;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          searchName = req.query.search ? {
            $or: [{
              name: {
                $regex: req.query.search,
                $options: "i"
              }
            }, {
              email: {
                $regex: req.query.search,
                $options: "i"
              }
            }]
          } : {};
          console.log(searchName);
          _context3.next = 5;
          return regeneratorRuntime.awrap(userModel.find(searchName).find({
            _id: {
              $ne: req.user._id
            }
          }));

        case 5:
          user = _context3.sent;
          return _context3.abrupt("return", res.status(200).send(user));

        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](0);
          return _context3.abrupt("return", next(createError(500, _context3.t0.message)));

        case 12:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 9]]);
});
module.exports = {
  userSignup: userSignup,
  userLogin: userLogin,
  searchUser: searchUser
};