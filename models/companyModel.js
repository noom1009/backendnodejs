const con = require("../settings/configs/mysql");
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const path = require("path");
const app = express();
var md5 = require("md5");
const bcrypt = require("bcrypt");
const env = require("../settings/configs/env");
const saltRounds = env.saltRounds;
const company = require("./schema/company/index");
const db = require("./index");
const Sequelize = require("sequelize");
const CompanyDB = db.CompanyDB;
const Op = db.Sequelize.Op;

class CompanyModel {
  constructor({
    f_code = "",
    f_companyname = "",
    f_address = "",
    f_tel = "",
    f_tax = "",
    f_let = "",
    f_long = "",
    f_website = "",
    f_facebook = "",
    f_youtube = "",
    f_instagram = "",
    f_twitter = "",
    f_logo = "",
    f_status = "",
  }) {
    this.f_code = f_code;
    this.f_companyname = f_companyname;
    this.f_address = f_address;
    this.f_tel = f_tel;
    this.f_tax = f_tax;
    this.f_let = f_let;
    this.f_long = f_long;
    this.f_website = f_website;
    this.f_facebook = f_facebook;
    this.f_youtube = f_youtube;
    this.f_instagram = f_instagram;
    this.f_twitter = f_twitter;
    this.f_logo = f_logo;
    this.f_status = f_status;
  }
  saveData() {
    const company = {
      f_code: this.f_code,
      f_companyname: this.f_companyname,
      f_address: this.f_address,
      f_tel: this.f_tel,
      f_tax: this.f_tax,
      f_let: this.f_let,
      f_long: this.f_long,
      f_website: this.f_website,
      f_facebook: this.f_facebook,
      f_youtube: this.f_youtube,
      f_instagram: this.f_instagram,
      f_twitter: this.f_twitter,
      f_logo: this.f_logo,
      f_status: this.f_status,
    };
    return CompanyDB.create(company)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static update(f_code, sqlupdate) {
    return CompanyDB.update(
      {
        f_companyname: sqlupdate.f_companyname,
        f_address: sqlupdate.f_address,
        f_tel: sqlupdate.f_tel,
        f_tax: sqlupdate.f_tax,
        f_let: sqlupdate.f_let,
        f_long: sqlupdate.f_long,
        f_website: sqlupdate.f_website,
        f_facebook: sqlupdate.f_facebook,
        f_youtube: sqlupdate.f_youtube,
        f_instagram: sqlupdate.f_instagram,
        f_twitter: sqlupdate.f_twitter,
        f_logo: sqlupdate.f_logo,
        f_status: sqlupdate.f_status,
      },
      { where: { f_code: f_code } }
    )
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static findByName({ f_companyname = "" }) {
    return CompanyDB.findOne({
      where: { f_companyname: f_companyname, f_status: "1" },
    })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static findAll() {
    return CompanyDB.findAll()
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static findCount() {
    return CompanyDB.findAndCountAll({
      where: {
        f_status: 0,
      },
    })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static approve(f_code) {
    return CompanyDB.update(
      {
        f_status: 1,
      },
      {
        where: { f_code: f_code },
      }
    )
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static delete(f_code) {
    return CompanyDB.destroy({
      where: { f_code: f_code },
    })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static findOne(f_code) {
    return CompanyDB.findByPk(f_code)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = CompanyModel;
