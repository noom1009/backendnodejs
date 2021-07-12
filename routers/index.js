const express = require("express");
const app = express();
const router = express.Router();
const path = require("path");
const log = require("../middleware/logger");
const setting = require('../setings/configs/setting');
const env = require('../setings/configs/env');
const lang = require('../setings/lang/lang_app');

const authenRouter = require("./authen/index");
router.use("/authen", authenRouter);

module.exports = router;