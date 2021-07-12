const express = require("express");
const app = express();
const router = express.Router();
const md5 = require("md5");
const env = require("../config/env");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

function randomstring(L) {
  var s = "";
  var randomchar = function () {
    var n = Math.floor(Math.random() * 62);
    if (n < 10) return n;
    if (n < 36) return String.fromCharCode(n + 55);
    return String.fromCharCode(n + 61);
  };
  while (s.length < L) s += randomchar();
  return s;
}
module.exports = randomstring;