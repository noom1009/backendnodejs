const express = require("express");
const router = express.Router();
const axios = require("axios");
const cors = require("cors");
const app = express();
const log4js = require("log4js");
const log = log4js.getLogger();
const logger = require("morgan");
const session = require("express-session");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const md5 = require("md5");
const nodemailer = require("nodemailer");
const db = require("../models/index");
const sequelize = db.sequelize;
const env = require("../settings/configs/env");
const setting = require("../settings/configs/setting");
const saltRounds = env.saltRounds;
const lang = require("../settings/lang/lang_app");

let tsData = Date.now();
const moment = require("moment");
const momentTZ = require("moment-timezone");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const now = new Date();
const dateString = moment(now).tz("Asia/Bangkok").format("D/M/Y");
const dateFormat = moment(now).tz("Asia/Bangkok").format("YYYY-MM-DD hh:mm:ss");
const companyModel = require("../models/companyModel");
const con = require("../settings/configs/mysql");
const CompanyDB = db.CompanyDB;

exports.getPageController = (req, res, next) => {
  CompanyDB.findAll()
    .then((result) => {
      res.status(201).json({
        data: result,
        message: lang.readeDatabase,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: error,
      });
    });
};

exports.saveController = (req, res, next) => {
  const company = new companyModel({
    f_companyname: req.body.f_companyname,
    f_address: req.body.f_address,
    f_telphone: req.body.f_telphone,
    f_tax: req.body.f_tax,
    f_let: req.body.f_let,
    f_long: req.body.f_long,
    f_youtbue: req.body.f_youtbue,
    f_website: req.body.f_website,
    f_images: req.body.f_images,
    f_status: req.body.f_status,
  });
  company
    .saveAll()
    .then((result) => {
      res.status(201).json({
        message: lang.readeDatabase,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: error + ": " + lang.createDataError,
      });
    });
};

exports.updateController = (req, res, next) => {
  const f_code = req.params.f_code;
  companyModel
    .update(f_code, req.body)
    .then(function (result) {
      res.status(201).json({
        message: lang.readeDatabase,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err + ": " + lang.updateDataError + ": " + id,
      });
    });
};

exports.searchController = (req, res, next) => {
  const f_code = req.params.f_code;
  companyModel
    .findOne(f_code)
    .then((result) => {
      res.status(201).json({
        message: lang.readeDatabase,
        resultUsers: result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: error,
      });
    });
};

exports.deleteController = (req, res, next) => {
  const f_code = req.params.f_code;
  companyModel
    .delete(f_code)
    .then(function (result) {
      res.status(201).json({
        message: lang.readeDatabase,
        resultUsers: result,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err + ": " + lang.updateDataError + ": " + id,
      });
    });
};

exports.companyController = (req, res, next) => {};
