"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.set('port', process.env.PORT || 3000);

app.use('/', _express2.default.static(_path2.default.join(__dirname, '../public')));

app.get('/', function (req, res) {
  res.redirect('/index.html');
});

app.listen(app.get('port'), function () {
  console.log("Server started: http://localhost:" + app.get("port") + "/");
});

exports.default = app;
//# sourceMappingURL=server.js.map