"use strict";

var asyncHandler = require("express-async-handler");

var chatModel = require("../models/Chat");

var createHttpError = require("http-errors");

var userModel = require("../models/User");

var accesschat = asyncHandler(function _callee(req, res, next) {
  var userId, chatExists, createChat, fullChat;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          userId = req.body.userId;
          console.log(userId);

          if (userId) {
            _context.next = 4;
            break;
          }

          return _context.abrupt("return", next(createHttpError(500, "UserId Does Not Exists")));

        case 4:
          _context.prev = 4;
          _context.next = 7;
          return regeneratorRuntime.awrap(chatModel.find({
            isGroup: false,
            $and: [{
              users: {
                $elemMatch: {
                  $eq: userId
                }
              }
            }, {
              users: {
                $elemMatch: {
                  $eq: req.user._id
                }
              }
            }]
          }).populate('users', '-password').populate('latestMessage'));

        case 7:
          chatExists = _context.sent;

          if (chatExists.length) {
            _context.next = 18;
            break;
          }

          _context.next = 11;
          return regeneratorRuntime.awrap(chatModel.create({
            chatName: "sender",
            isGroup: false,
            users: [req.user._id, userId]
          }));

        case 11:
          createChat = _context.sent;
          _context.next = 14;
          return regeneratorRuntime.awrap(chatModel.findOne({
            _id: createChat._id
          }).populate('users', '-password'));

        case 14:
          fullChat = _context.sent;
          return _context.abrupt("return", res.send(fullChat));

        case 18:
          return _context.abrupt("return", res.send(chatExists));

        case 19:
          _context.next = 24;
          break;

        case 21:
          _context.prev = 21;
          _context.t0 = _context["catch"](4);
          return _context.abrupt("return", next(createHttpError(500, _context.t0.message)));

        case 24:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[4, 21]]);
});
var fetchchats = asyncHandler(function _callee2(req, res, next) {
  var chatExists;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(chatModel.find({
            users: {
              $elemMatch: {
                $eq: req.user._id
              }
            }
          }).populate("users", "-password").populate("groupAdmin", "-password").populate("latestMessage").sort({
            updatedAt: -1
          }));

        case 3:
          chatExists = _context2.sent;

          if (!chatExists.length) {
            _context2.next = 8;
            break;
          }

          return _context2.abrupt("return", res.send(chatExists));

        case 8:
          return _context2.abrupt("return", next(createHttpError(400, "User Does not exists")));

        case 9:
          _context2.next = 14;
          break;

        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](0);
          next(createHttpError(500, _context2.t0.message));

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 11]]);
});
var groupChat = asyncHandler(function _callee3(req, res, next) {
  var _req$body, name, users, _groupChat, group;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _req$body = req.body, name = _req$body.name, users = _req$body.users;
          console.log(name, users);

          if (!(!name || !users)) {
            _context3.next = 4;
            break;
          }

          return _context3.abrupt("return", next(createHttpError(400, "Enter all the Fields")));

        case 4:
          users.push(req.user);

          if (!(users.length < 2)) {
            _context3.next = 7;
            break;
          }

          return _context3.abrupt("return", next(createHttpError(400, "Users should be more than 2 members")));

        case 7:
          _context3.prev = 7;
          _context3.next = 10;
          return regeneratorRuntime.awrap(chatModel.create({
            name: name,
            isGroup: true,
            users: users,
            groupAdmin: req.user
          }));

        case 10:
          _groupChat = _context3.sent;
          console.log(_groupChat);
          _context3.next = 14;
          return regeneratorRuntime.awrap(chatModel.findOne({
            _id: _groupChat._id
          }).populate('users', "-password").populate('groupAdmin', "-password"));

        case 14:
          group = _context3.sent;
          return _context3.abrupt("return", res.send(group));

        case 18:
          _context3.prev = 18;
          _context3.t0 = _context3["catch"](7);
          next(createHttpError(500, _context3.t0.message));

        case 21:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[7, 18]]);
});
var rename = asyncHandler(function _callee4(req, res, next) {
  var _req$body2, id, name, findGroup;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _req$body2 = req.body, id = _req$body2.id, name = _req$body2.name;
          _context4.prev = 1;
          _context4.next = 4;
          return regeneratorRuntime.awrap(chatModel.findByIdAndUpdate({
            _id: id
          }, {
            name: name
          }, {
            "new": true
          }).populate("users", "-password").populate("groupAdmin", "-password"));

        case 4:
          findGroup = _context4.sent;
          return _context4.abrupt("return", res.send(findGroup));

        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](1);
          return _context4.abrupt("return", next(createHttpError(500, _context4.t0.message)));

        case 11:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[1, 8]]);
});
var addUserToGroup = asyncHandler(function _callee5(req, res, next) {
  var _req$body3, userId, groupId, group;

  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _req$body3 = req.body, userId = _req$body3.userId, groupId = _req$body3.groupId;
          _context5.prev = 1;
          _context5.next = 4;
          return regeneratorRuntime.awrap(chatModel.findByIdAndUpdate({
            _id: groupId
          }, {
            $push: {
              users: userId
            }
          }, {
            "new": true
          }).populate("users", "-password").populate("groupAdmin", "-password"));

        case 4:
          group = _context5.sent;
          return _context5.abrupt("return", res.send(group));

        case 8:
          _context5.prev = 8;
          _context5.t0 = _context5["catch"](1);
          return _context5.abrupt("return", next(createHttpError(500, _context5.t0.message)));

        case 11:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[1, 8]]);
});
var deleteUser = asyncHandler(function _callee6(req, res, next) {
  var _req$body4, userId, groupId, group;

  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _req$body4 = req.body, userId = _req$body4.userId, groupId = _req$body4.groupId;
          console.log(userId);
          _context6.prev = 2;
          _context6.next = 5;
          return regeneratorRuntime.awrap(chatModel.findByIdAndUpdate({
            _id: groupId
          }, {
            $pull: {
              users: userId
            }
          }, {
            "new": true
          }).populate("users", "-password").populate("groupAdmin", "-password"));

        case 5:
          group = _context6.sent;
          return _context6.abrupt("return", res.send(group));

        case 9:
          _context6.prev = 9;
          _context6.t0 = _context6["catch"](2);
          return _context6.abrupt("return", next(createHttpError(500, _context6.t0.message)));

        case 12:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[2, 9]]);
});
module.exports = {
  accesschat: accesschat,
  fetchchats: fetchchats,
  groupChat: groupChat,
  rename: rename,
  addUserToGroup: addUserToGroup,
  deleteUser: deleteUser
};