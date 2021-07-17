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
const env = require('../../settings/configs/env');
const setting = require('../../settings/configs/setting');
const lang = require('../../settings/lang/lang_app');
const companyControllers = require("../../controllers/companyControllers");

router.get(
    "/",
    companyControllers.getPageController,
    function (req, res, next) {}
  );
  router.get(
	"/:f_code",
	companyControllers.searchController,
	function (req, res, next) {}
      );
      
      router.post(
	"/",
	companyControllers.saveController,
	function (req, res, next) {}
      );
      router.post(
	"/",
	companyControllers.updateController,
	function (req, res, next) {}
      );
      
      router.delete(
	"/:f_code",
	companyControllers.deleteController,
	function (req, res, next) {}
      );

  module.exports = router;