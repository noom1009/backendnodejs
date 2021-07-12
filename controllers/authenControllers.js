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
const env = require('../setings/configs/env');
const setting = require('../setings/configs/setting');
const saltRounds = env.saltRounds;
const lang = require('../setings/lang/lang_app');

let tsData = Date.now();
const moment = require("moment");
const momentTZ = require("moment-timezone");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const now = new Date();
const dateString = moment(now).tz("Asia/Bangkok").format("D/M/Y");
const dateFormat = moment(now).tz("Asia/Bangkok").format("YYYY-MM-DD hh:mm:ss");
const UserModel = require('../models/userModel');
const Users = db.UsersDB;

exports.getPageController = async (req, res, next) => {
    res.status(200).json("Authen");
  };
  
  exports.logOutController = async (req, res, next) => {
    req.session.destroy();
    res.status(200).json({
      message: lang.logOut,
    });
  };
  
  exports.logInController = (req, res, next) => {
    const { f_login_name = "", f_login_password } = req.body;
    UserModel.findUserByEmail({ f_login_name: f_login_name })
      .then((result) => {
        if (result.length !== 0) {
          console.log(result)
          const f_name = result.f_name;
          const f_lastname = result.f_lastname;
          const f_department = result.f_department;
          const f_admin_status = result.f_admin_status;
          const f_login_name = result.f_login_name;
          const f_position = result.f_position;
          const f_acc_code = result.f_acc_code;
          const f_accounttype = result.f_accounttype;
          let dataUsers = result;
          return bcrypt
            .compare(f_login_password, result.f_hash_password)
            .then((result) => {
              console.log(result)
              if (!result) {
                res.status(401).json({
                  message: lang.loginFailed,
                });
              } else {
                let jwtToken = jwt.sign(
                  {
                    f_login_name: f_login_name,
                    userId: f_acc_code,
                  },
                  env.secret,
                  {
                    expiresIn: "1h", 
                  }
                );
                let token = jwtToken;
                req.session.f_acc_code = f_acc_code;
                req.session.f_login_name = f_login_name;
                req.session.f_name = f_name;
                req.session.f_lastname = f_lastname;
                req.session.f_department = f_department;
                req.session.f_position = f_position;
                req.session.f_admin_status = f_admin_status;
                req.session.f_accounttype = f_accounttype;
                res.header("auth-token", token).send(token);
                res.status(200).json({
                  token: jwtToken,
                  dataUsers: dataUsers,
                  message: lang.usersSuccess,
                });
              }
            })
            .catch((error) => {
              res.status(500).json({
                message: error + ": " + lang.loginFailed,
              });
            });
        } else {
          res.status(401).json({
            message: lang.loginFailed,
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: err + ": " + lang.loginFailed,
        });
      });
  };
  
  exports.authenController = (req, res, next) => {};