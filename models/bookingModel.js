const con = require('../settings/configs/mysql');
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const path = require("path");
const app = express();
var md5 = require("md5");
const bcrypt = require("bcrypt");
const env = require('../settings/configs/env');
const saltRounds = env.saltRounds;
const booking = require('./schema/booking/index');
const db = require('./index');
const Sequelize = require('sequelize')
const BookingDB = db.BookingDB;
const Op = db.Sequelize.Op;


class BookingModel {
  constructor({
    f_code = "",
    f_running = "",
    f_customer = "",
    f_mobile = "",
    f_cardid = "",
    f_birthdate = "",
    f_address = "",
    f_mail_address = "",
    f_email = "",
    f_line = "",
    f_nation = "",
    f_gent = "",
    f_project = "",
    f_unit = "",
    f_type = "",
    f_status = "",
    f_pricesum ="",
  }) {
    this.f_code = f_code;
    this.f_running = f_running;
    this.f_customer = f_customer;
    this.f_mobile = f_mobile;
    this.f_cardid = f_cardid;
    this.f_birthdate = f_birthdate;
    this.f_address = f_address;
    this.f_mail_address = f_mail_address;
    this.f_email = f_email;
    this.f_line = f_line;
    this.f_nation = f_nation;
    this.f_gent = f_gent;
    this.f_project = f_project;
    this.f_unit = f_unit;
    this.f_type = f_type;
    this.f_status = f_status;
    this.f_pricesum = f_pricesum;
  }
  saveData() {
    const users = {
        f_code: this.f_code,
        f_running: this.f_running,
        f_customer: this.f_customer,
        f_mobile: this.f_mobile,
        f_cardid: this.f_cardid,
        f_birthdate: this.f_birthdate,
        f_address: this.f_address,
        f_mail_address: this.f_mail_address,
        f_email: this.f_email,
        f_line: this.f_line,
        f_nation: this.f_nation,
        f_gent: this.f_gent,
        f_project: this.f_project,
        f_unit: this.f_unit,
        f_type: this.f_type,
        f_status: this.f_status,
        f_pricesum: this.f_pricesum,
    };
    return BookingDB.create(users)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static update(f_code,sqlupdate) {
    return UsersDB.update({ f_running: sqlupdate.f_running, f_customer: sqlupdate.f_customer, f_login_name: sqlupdate.f_login_name ,f_status: sqlupdate.f_status, f_admin_status: sqlupdate.f_admin_status, f_accounttype: sqlupdate.f_accounttype},
       { where: { f_code: f_code } })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static findByEmail({ f_email = "" }) {
    return BookingDB.findOne({
      where: { f_email: f_email, f_status: "1" },
    })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static findAll() {
    return BookingDB.findAll()
      .then((result) => {
       // console.log(result)
        return result;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static findCount() {
    return BookingDB.findAndCountAll({
        where: {
           f_status: 0
        }
      })
         .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static approve(f_code) {
    return BookingDB.update({
        f_status: 1
      }, {
        where: { f_code: f_code }
      })
         .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log(err);
      });
  }


  static delete(f_acc_code) {
    return BookingDB.destroy({
        where: { f_acc_code: f_acc_code }
      })
         .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static findOne(f_acc_code) {
    return BookingDB.findByPk(f_acc_code)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log(err);
      });
  }




}

module.exports = BookingModel;
