"use strict";

var asyncHandler = require("express-async-handler");

var createHttpError = require("http-errors");

var messageModel = require("../models/Message");

var chatModel = require("../models/Chat");

var userModel = require("../models/User");

var chatMessage = asyncHandler(function _callee(req, res, next) {
  var _req$body, content, chat, message;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, content = _req$body.content, chat = _req$body.chat; // console.log(content,chat)

          if (!(!content || !chat)) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", next(createHttpError("500", "Provide Details")));

        case 3:
          sender = req.user._id;
          _context.prev = 4;
          _context.next = 7;
          return regeneratorRuntime.awrap(messageModel.create({
            content: content,
            chat: chat,
            sender: sender
          }));

        case 7:
          message = _context.sent;
          _context.next = 10;
          return regeneratorRuntime.awrap(message.populate("sender", "name profilePicture"));

        case 10:
          message = _context.sent;
          _context.next = 13;
          return regeneratorRuntime.awrap(message.populate("chat"));

        case 13:
          message = _context.sent;
          _context.next = 16;
          return regeneratorRuntime.awrap(userModel.populate(message, {
            path: "chat.users",
            select: "name email profilePicture"
          }));

        case 16:
          message = _context.sent;
          // console.log(message)
          res.json(message);
          _context.next = 23;
          break;

        case 20:
          _context.prev = 20;
          _context.t0 = _context["catch"](4);
          return _context.abrupt("return", next(createHttpError("500", _context.t0)));

        case 23:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[4, 20]]);
});
var allMessages = asyncHandler(function _callee2(req, res, next) {
  var chatId, _allMessages;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          chatId = req.params.chatId; // console.log(chatId)

          if (!chatId) {
            next(createHttpError(500, "Provide chatId"));
          }

          _context2.prev = 2;
          _context2.next = 5;
          return regeneratorRuntime.awrap(messageModel.find({
            chat: chatId
          }).populate("sender", "name profilePicture").populate('chat'));

        case 5:
          _allMessages = _context2.sent;
          res.json(_allMessages);
          _context2.next = 12;
          break;

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](2);
          next(createHttpError(500, _context2.t0));

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[2, 9]]);
});
module.exports = {
  chatMessage: chatMessage,
  allMessages: allMessages
};