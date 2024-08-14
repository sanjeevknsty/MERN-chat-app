"use strict";

var createHttpError = require("http-errors");

var jwt = require('jsonwebtoken');

var userModel = require("../models/User");

var authToken = function authToken(req, res, next) {
  var authToken, token, verifyId;
  return regeneratorRuntime.async(function authToken$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          authToken = req.headers.authorization;

          if (!(authToken && authToken.startsWith("Bearer"))) {
            _context.next = 16;
            break;
          }

          _context.prev = 2;
          token = authToken.split(' ')[1];
          verifyId = jwt.verify(token, process.env.SECRET_KEY);
          _context.next = 7;
          return regeneratorRuntime.awrap(userModel.findById(verifyId.id).select('-password'));

        case 7:
          req.user = _context.sent;
          next();
          _context.next = 14;
          break;

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](2);
          next(createHttpError(400, _context.t0.message));

        case 14:
          _context.next = 17;
          break;

        case 16:
          next(createHttpError(400, "Error Occured"));

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 11]]);
};

module.exports = authToken;