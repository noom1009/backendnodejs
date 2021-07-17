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
const env = require('../settings/configs/env');
const setting = require('../settings/configs/setting');
const saltRounds = env.saltRounds;
const lang = require('../settings/lang/lang_app');

let tsData = Date.now();
const moment = require("moment");
const momentTZ = require("moment-timezone");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const now = new Date();
const dateString = moment(now).tz("Asia/Bangkok").format("D/M/Y");
const dateFormat = moment(now).tz("Asia/Bangkok").format("YYYY-MM-DD hh:mm:ss");
const BookingModel = require('../models/bookingModel');
const con = require("../settings/configs/mysql");
const BookingDB = db.BookingDB;

exports.getPageController =  (req, res, next) => {
  if(res.statusCode !== 200){
   // res.status(200).json("ร้องขอสำเร็จ");
    BookingModel.findAll()
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
  }else if(res.statusCode !== 202){
  //  res.status(202).json("ยอมรับแล้ว แต่กำลังประมวลผลบางอย่าง");
    BookingModel.findAll()
    .then((result) => {
        res.status(202).json({
          data: result,
          message: lang.readeDatabase,
        });
      })
      .catch((error) => {
        res.status(500).json({
          message: error,
        });
      });
  }else if(res.statusCode !== 403){
    res.status(403).json("ผู้ใช้ปัจจุบันถูกห้ามไม่ให้เข้าถึงข้อมูลส่วนนี้ (Forbidden)");
  }else if(res.statusCode !== 405){
    res.status(403).json("Method Not Allowed เซิร์ฟเวอร์ไม่รู้จัก request methods ที่ร้องขอมา (เช่น get, post) หรือถูกปิด ไม่สามารถใช้งานได้");
  }else{
      res.status(404).json("ยอมรับแล้ว แต่กำลังประมวลผลบางอย่าง");
    } 
  };
  exports.bookingController = (req, res, next) => {};