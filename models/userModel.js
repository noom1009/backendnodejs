const con = require('../setings/configs/mysql');
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const path = require("path");
const app = express();
var md5 = require("md5");
const bcrypt = require("bcrypt");
const env = require('../setings/configs/env');
const saltRounds = env.saltRounds;
const users = require('./schema/users/tbluser');
const db = require('./index');
const Sequelize = require('sequelize')
const UsersDB = db.UsersDB;
const Op = db.Sequelize.Op;


class UserModel {
  constructor({
    f_acc_code = "",
    f_name = "",
    f_lastname = "",
    f_login_name = "",
    f_login_password = "",
    f_hash_password = "",
    f_salt_password = "",
    f_email = "",
    f_mobile = "",
    f_company = "",
    f_department = "",
    f_position = "",
    f_dateupdate = "",
    f_status = "",
    f_admin_status = "",
    f_accounttype = "",
    f_activecode ="",
  }) {
    this.f_acc_code = f_acc_code;
    this.f_name = f_name;
    this.f_lastname = f_lastname;
    this.f_login_name = f_login_name;
    this.f_login_password = f_login_password;
    this.f_hash_password = f_hash_password;
    this.f_salt_password = f_salt_password;
    this.f_email = f_email;
    this.f_mobile = f_mobile;
    this.f_company = f_company;
    this.f_department = f_department;
    this.f_position = f_position;
    this.f_dateupdate = f_dateupdate;
    this.f_status = f_status;
    this.f_admin_status = f_admin_status;
    this.f_accounttype = f_accounttype;
    this.f_activecode = f_activecode;
  }
  registerUser() {
    const users = {
      f_acc_code: this.f_acc_code,
      f_name: this.f_name,
      f_lastname: this.f_lastname,
      f_login_name: this.f_login_name,
      f_login_password: this.f_login_password,
      f_hash_password: this.f_hash_password,
      f_salt_password: this.f_salt_password,
      f_email: this.f_email,
      f_mobile: this.f_mobile,
      f_company: this.f_company,
      f_department: this.f_department,
      f_position: this.f_position,
      f_dateupdate: this.f_dateupdate,
      f_admin_status: this.f_admin_status,
      f_status: this.f_status,
      f_accounttype: this.f_accounttype,
      f_activecode: this.f_activecode,
    };
    return UsersDB.create(users)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static findUserByEmail({ f_login_name = "" }) {
    return UsersDB.findOne({
      where: { f_login_name: f_login_name, f_status: "1" },
    })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static findUserAll() {
    return UsersDB.findAll()
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static findcountUsers() {
    return UsersDB.findAndCountAll({
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

  static approveUsers(f_acc_code) {
    return UsersDB.update({
        f_status: 1
      }, {
        where: { f_acc_code: f_acc_code }
      })
         .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static activeCode(f_login_name, f_activecode, f_login_password) {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      const passworddata = md5(f_login_name) + salt;
      return UsersDB.update({ f_login_password: md5(passworddata)},
        { where: { f_login_name: f_login_name , f_email: f_login_name , f_activecode: f_activecode } })
        .then((result) => {
          return result;
        })
        .catch((err) => {
          console.log(err);
        });
       });
  }

  static registerActiveCode(f_login_name, f_activecode) {
    return UsersDB.update({ f_activecode: f_activecode },
       { where: { f_login_name: f_login_name , f_email: f_login_name } })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static deleteUsers(f_acc_code) {
    return UsersDB.destroy({
        where: { f_acc_code: f_acc_code }
      })
         .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static findUserone(f_acc_code) {
    return UsersDB.findByPk(f_acc_code)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log(err);
      });
  }


  static updateUsers(f_acc_code,sqlupdate) {
    return UsersDB.update({ f_name: sqlupdate.f_name, f_lastname: sqlupdate.f_lastname, f_login_name: sqlupdate.f_login_name ,f_status: sqlupdate.f_status, f_admin_status: sqlupdate.f_admin_status, f_accounttype: sqlupdate.f_accounttype},
       { where: { f_acc_code: f_acc_code } })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log(err);
      });
  }

}

module.exports = UserModel;
