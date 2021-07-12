const con = require('../setings/configs/mysql');
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const logs = require("log4js");
const path = require("path");
const app = express();
const md5 = require("md5");
const bcrypt = require("bcrypt");
const env = require('../setings/configs/env');
const saltRounds = env.saltRounds;
const user = require('../models/schema/users/tbluser');
const db = require('./index');
const log = require('../middleware/logger');
const Sequelize = require("sequelize");
const UsesrDB = db.UsesrDB;
const Op = db.Sequelize.Op;

class userModel {
  constructor({
    f_name = "",
    f_lastname = "",
    f_login_name = "",
    f_login_password = "",
    f_email = "",
    f_mobile = "",
    f_company = "",
    f_department = "",
    f_position = "",
    f_status = "",
    f_admin_status = "",
    f_dateupdate = "",
    f_datetime = "",
    f_temp = "",
    f_pic = "",
    f_authentication = "",
  }) {
    this.f_name = f_name;
    this.f_lastname = f_lastname;
    this.f_login_name = f_login_name;
    this.f_login_password = f_login_password;
    this.f_email = f_email;
    this.f_mobile = f_mobile;
    this.f_company = f_company;
    this.f_department = f_department;
    this.f_position = f_position;
    this.f_status = f_status;
    this.f_admin_status = f_admin_status;
    this.f_dateupdate = f_dateupdate;
    this.f_datetime = f_datetime;
    this.f_temp = f_temp;
    this.f_pic = f_pic;
    this.f_authentication = f_authentication;
  }
  createData() {
    const newData = {
      f_name: this.f_name,
      f_lastname: this.f_lastname,
      f_login_name: this.f_login_name,
      f_login_password: this.f_login_password,
      f_email: this.f_email,
      f_mobile: this.f_mobile,
      f_company: this.f_company,
      f_department: this.f_department,
      f_position: this.f_position,
      f_status: this.f_status,
      f_admin_status: this.f_admin_status,
      f_dateupdate: this.f_dateupdate,
      f_datetime: this.f_datetime,
      f_temp: this.f_temp,
      f_pic: this.f_pic,
      f_authentication: this.f_authentication,
    };
    return UsesrDB.create(newData)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  static findAll() {
    return UsesrDB.findAll()
      .then((result) => {
        return result;
      })
      .catch((err) => {
        log.logger("warring", "505" + err.message || lang.readeDataError);
        console.log(err);
      });
  }

  static findByEmail({ f_login_name = "" }) {
    return UsesrDB.findOne({
      where: { f_login_name: f_login_name, f_status: "1" },
    })
      .then((result) => {
          console.log(result)
        return result;
      })
      .catch((err) => {
        log.logger("warring", "505" + err.message || lang.readeDataError);
        console.log(err);
        res.json({
          message: err.message || lang.readeDataError,
        });
      });
  }

  static findcountUsers() {
    return UsesrDB.findAndCountAll({
      where: {
        f_status: 0,
      },
    })
      .then((result) => {
        console.log(result.count);
        return result;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static deleteUsers(f_acc_id) {
    return UsesrDB.destroy({
      where: { f_acc_id: f_acc_id },
    })
      .then((result) => {
        console.log(result);
        return result;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static approveUsers(f_acc_id) {
    return UsesrDB.update(
      {
        f_status: 1,
      },
      {
        where: { f_acc_id: f_acc_id },
      }
    )
      .then((result) => {
        console.log(result);
        return result;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static findUserone(f_acc_id) {
    return UsesrDB.findByPk(f_acc_id)
      .then((result) => {
        console.log(result);
        return result;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static updateUsers(f_acc_id, sqlupdate) {
    return UsesrDB.update(
      {
        f_name: sqlupdate.f_name,
        f_lastname: sqlupdate.f_lastname,
        f_login_name: sqlupdate.f_login_name,
        f_status: sqlupdate.f_status,
        f_admin_status: sqlupdate.f_admin_status,
        f_accounttype: sqlupdate.f_accounttype,
      },
      { where: { f_acc_id: f_acc_id } }
    )
      .then((result) => {
        console.log(result);
        return result;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = userModel;