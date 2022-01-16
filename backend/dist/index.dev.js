"use strict";

var express = require('express');

var cookieParser = require('cookie-parser');

var zones = require('./zones');

var configureUnlock = require('@unlock-protocol/unlock-express');

var app = express();
var port = process.env.PORT || 3000;
app.use(cookieParser());

var _configureUnlock = configureUnlock({
  yieldPaywallConfig: function yieldPaywallConfig() {
    return {
      locks: {
        '0xafa8fE6D93174D17D98E7A539A90a2EFBC0c0Fc1': {
          network: 4
        }
      }
    };
  },
  getUserEthereumAddress: function getUserEthereumAddress(request) {
    return regeneratorRuntime.async(function getUserEthereumAddress$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", request.cookies.userAddress);

          case 1:
          case "end":
            return _context.stop();
        }
      }
    });
  },
  updateUserEthereumAddress: function updateUserEthereumAddress(request, response, address) {
    return regeneratorRuntime.async(function updateUserEthereumAddress$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            response.cookie('userAddress', address);

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    });
  }
}, app),
    membersOnly = _configureUnlock.membersOnly;

var dateInZone = function dateInZone(zone, label) {
  var d = new Date();
  var city = label || zone.split("/")[1].replace('_', ' ');
  return "".concat(d.toLocaleString('en-US', {
    timeZone: zone
  }), " in ").concat(city);
};

app.get('/', function (req, res) {
  res.send("<h1>World Clocks</h1>\n  <p>It is now: </p>\n  <ul>\n  <li>".concat(dateInZone("Asia/Tokyo"), "</li>\n  <li>").concat(dateInZone("Asia/Kolkata"), "</li>\n  <li>").concat(dateInZone("Europe/Paris"), "</li>\n  <li>").concat(dateInZone("America/New_York"), "</li>\n  </ul>\n  <p>Premium version: <a href=\"/premium\">select any time zone</a>!</p>"));
});
app.get('/premium', membersOnly(), function (req, res) {
  res.send("<h1>World Clocks</h1>\n  <p>Thank you for your support!</p>\n  ".concat(zones.map(function (group) {
    return "<div>\n      <h2>".concat(group.group, "</h2>\n      <ul>\n        ").concat(group.zones.map(function (_ref) {
      var value = _ref.value,
          name = _ref.name;
      return "<li>".concat(dateInZone(value, name), "</li>");
    }).join(""), "\n      </ul>\n    </div>");
  }).join(""), "\n  <p>Premium version: select any time zone!</p>\n  <p><a href=\"/logout\">Logout</a></p>"));
});
app.get('/logout', function (req, res) {
  res.clearCookie('userAddress');
  res.redirect('/');
});
app.listen(port, function () {
  console.log("Example app listening at http://localhost:".concat(port));
});