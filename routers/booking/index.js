const express = require("express");
const app = express();
const cors = require("cors");
const router = express.Router();
const path = require("path");
const session = require("express-session");
const md5 = require("md5");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const crypto = require("crypto");
const env = require('../../setings/configs/env');
const setting = require('../../setings/configs/setting');
const lang = require('../../setings/lang/lang_app');
const bookingControllers = require("../../controllers/bookingControllers");

router.get(
    "/",
    bookingControllers.getPageController,
    function (req, res, next) {}
  );

  module.exports = router;