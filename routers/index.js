const express = require("express");
const app = express();
const router = express.Router();
const path = require("path");
const log = require("../middleware/logger");
const setting = require('../settings/configs/setting');
const env = require('../settings/configs/env');
const lang = require('../settings/lang/lang_app');

const authenRouter = require("./authen/index");
const bookingRouter = require("./booking/index");
const companyRouter = require('./company/index');

router.use("/authen", authenRouter);
router.use("/booking", bookingRouter);
router.use('/company', companyRouter);

module.exports = router;