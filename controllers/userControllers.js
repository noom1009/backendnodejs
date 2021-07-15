var express = require("express");
var router = express.Router();
const axios = require("axios");
var app = express();
var log4js = require("log4js");
var logger = log4js.getLogger();
var session = require("express-session");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
var md5 = require("md5");
const nodemailer = require('nodemailer');
const db = require('../models/index');
const sequelize = db.sequelize;
const Usesr = db.UsesrDB;
const UserModel = require('./../models/users/usersModel');
const ProjectModel = require('../models/projects/index');
const env = require('../config/env');
const lang = require('../config/lang/lang_users');
const setting = require('../config/setting');
const log = require('../middleware/logger');
const saltRounds = env.saltRounds;


exports.registerController = (req, res, next) => {
  bcrypt.genSalt(saltRounds, (err, salt) => {
    let ts = Date.now();
    const passworddata = md5(req.body.f_login_password) + salt;
    bcrypt
      .hash(req.body.f_login_password, saltRounds)
      .then((hash) => {
        const User = new UserModel({
          f_name: req.body.f_name,
          f_lastname: req.body.f_lastname,
          f_login_name: req.body.f_login_name,
          f_login_password: md5(passworddata),
          f_hash_password: hash,
          f_salt_password: salt,
          f_email: req.body.f_email,
          f_mobile: req.body.f_mobile,
          f_company: setting.company,
          f_department: setting.department,
          f_position: setting.position,
          f_status: setting.UsersStatus ,
          f_admin_status: setting.UsersAdmin,
          f_accounttype: setting.Accounttype,
          f_dateupdate: ts,
        });
        User.registerUser()
          .then((result) => {
            log.logger('info', 'Register mail Error: ' + lang.userInsertMessages);
            res.render(setting.loginPage, {
              title: env.app_name,
              logo: env.logo_app,
              company_name: env.company_name,
              messagesboxs: lang.userInsertError,
            });

          })
          .catch((error) => {
            log.logger('info', 'Register mail Error 500: ' + error);            
            res.status(500).json({
              messagesboxs: error,
            });

          });
      })
      .catch((error) => {
        log.logger('info', 'Register mail Error 500: ' + error);        
        res.status(500).json({
          messagesboxs: error,
        });

      });
  });
};

exports.loginController = (req, res, next) => {

  const { f_login_name = "", f_login_password } = req.body;
  UserModel.findUserByEmail({ f_login_name: f_login_name })
    .then((result) => {
      if (result.length !== 0) {
        const f_name = result.f_name;
        const f_lastname = result.f_lastname;
        const f_department = result.f_department;
        const f_admin_status = result.f_admin_status;
        const f_login_name = result.f_login_name;
        const f_position = result.f_position;
        const f_acc_id = result.f_acc_id;
        const f_accounttype = result.f_accounttype;
        return bcrypt
          .compare(req.body.f_login_password, result.f_hash_password)
          .then((results) => {
                    log.logger('info', 'Register mail Error 500: ' + lang.usersMessages);      
            if (!results) {
              res.render(setting.usersPage, {
                title: env.app_name,
                logo: env.logo_app,
                company_name: env.company_name,
                messagesboxs: lang.usersMessages,
              });
            } else {
              let jwtToken = jwt.sign(
                {
                  f_login_name: f_login_name,
                  userId: f_acc_id,
                },
                env.secret,
                {
                  expiresIn: env.expiresIn, 
                }
              );
              req.session.f_acc_id = f_acc_id;
              req.session.f_login_name = f_login_name;
              req.session.f_name = f_name;
              req.session.f_lastname = f_lastname;
              req.session.f_department = f_department;
              req.session.f_position = f_position;
              req.session.f_admin_status = f_admin_status;
              req.session.f_accounttype = f_accounttype;
              UserModel.findcountUsers()
                .then((result) => {
                  var userApprove = result.count;
                ProjectModel.findUserAll()
                .then((results)=>{
                  res.render(setting.dashboardPage, {
                  data: {
                    title: lang.dashboard,
                    apptitle: env.apptitle,
                    logo: env.logo_app,
                    name: f_name,
                    lastname: f_lastname,
                    f_department: f_department,
                    company_name: env.company_name,
                    f_admin_status: f_admin_status,
                    countusers: userApprove,
                    f_accounttype:req.session.f_accounttype,
                    project: results,
                      retention: 0,
                      blank: 0,
                      booking: 0 ,
                      contract: 0,
                      down_payment: 0,
                      follow_up_on_loan: 0,
                      bank: 0,
                      schedule_transfer: 0,
                      transferred: 0,
                      cancel_data: 0,
                      under_repair: 0,
                      repair_completed: 0,
                      under_warranty: 0,
                      out_of_insurance: 0,
                      token: jwtToken,
                      expiresIn: env.expiresTime,
                      messagesboxs: lang.Loadmessagesboxs,
                  },
                });
              })
            })
            .catch((error) => {
                res.status(500).json({
                messagesboxs: error,
                });
          });
               res.status(200).send({ auth: true, token: jwtToken });
            }
          })
          .catch((error) => {
            res.render(setting.usersPage, {
              title: env.app_name,
              logo: env.logo_app,
              company_name: env.company_name,
              messagesboxs: lang.usersMessages,
            });
          });
      } else {
        res.status(401).json({
          messagesboxs: lang.usersMessages,
        });
      }
    })
    .catch((error) => {
      res.render(setting.usersPage, {
        title: env.app_name,
        logo: env.logo_app,
        company_name: env.company_name,
        messagesboxs: lang.usersMessages,
      });
      res.status(500).json({
        messagesboxs: lang.usersMessages,
        error: error,
      });
    });
};

exports.getusersController = (req, res, next) => {
  if (req.session.f_login_name) {
     UserModel.findcountUsers()
      .then((result) => {
        var userApprove = result.count;
        UserModel.findUserAll()
          .then((result) => {
                  res.render(setting.userPage, {
                    data: {
                      title: lang.usersTitles,
                      titledetail: lang.usersTilte,
                      apptitle: env.apptitle,
                      logo: env.logo_app,
                      name: req.session.f_name,
                      lastname: req.session.f_lastname,
                      f_department: req.session.f_department,
                      company_name: env.company_name,
                      f_admin_status: req.session.f_admin_status,
                      f_accounttype: req.session.f_accounttype,
                      datauser: result,
                      countusers: userApprove,     
                      langApprove: lang.langApprove,
                      langCancel : lang.langCancel,                      
                    },
                    messagesboxs: lang.Loadmessagesboxs,
                  });
                res.status(201).json({
                  messagesboxs: lang.usersMessages,
                });
              })
              .catch((error) => {
                res.status(500).json({
                  messagesboxs: error,
                });
              });
          })
      .catch((error) => {
            res.status(500).json({
              messagesboxs: error,
            });
          });
  } else {
    res.redirect(setting.rootPage);
  }
};

exports.approveusersController = (req, res, next) => {
  if (req.session.f_login_name) {
    const f_acc_code = req.params.id;
    UserModel.approveUsers(f_acc_code)
      .then(function (result) {       
            if (!result) {
              var messagesboxs= lang.approveError;
             } else {
              var messagesboxs= lang.approveMessages;
        }
        UserModel.findcountUsers()
          .then((result) => {
            var userApprove = result.count;
            UserModel.findUserAll()
              .then((result) => {
                      res.render(setting.userPage, {
                        data: {
                          title: lang.usersTiltes,
                          titledetail: lang.usersTilte,
                          apptitle: env.apptitle,
                          logo: env.logo_app,
                          name: req.session.f_name,
                          lastname: req.session.f_lastname,
                          f_department: req.session.f_department,
                          company_name: env.company_name,
                          f_admin_status: req.session.f_admin_status,
                          f_accounttype: req.session.f_accounttype,
                          datauser: result,
                          countusers: userApprove,     
                          langApprove: lang.langApprove,
                          langCancel : lang.langCancel,                      
                        },
                        messagesboxs: messagesboxs,
                      });
                  })
                  .catch((error) => {
                    res.status(500).json({
                      messagesboxs: error,
                    });
                  });
              })
          .catch((error) => {
                res.status(500).json({
                  messagesboxs: error,
                });
              });        
    })
    .catch(err => {
      res.status(500).send({
        messagesboxs: lang.approveError + id
      });
    });
     } else {
    res.redirect(setting.rootPage);
  }
};

exports.deleteuserController = (req, res, next) => {
  if (req.session.f_login_name) {
    const f_acc_code = req.params.id;
    UserModel.deleteUsers(f_acc_code)
      .then(function (result) {
            if (!result) {
              var messagesboxs= lang.usersDeleteError;
             } else {
              var messagesboxs= lang.usersdeleteMessages;
        }
        UserModel.findcountUsers()
          .then((result) => {
            var userApprove = result.count;
            UserModel.findUserAll()
              .then((result) => {
                      res.render(setting.userPage, {
                        data: {
                          title: lang.usersTiltes,
                          titledetail: lang.usersTilte,
                          apptitle: env.apptitle,
                          logo: env.logo_app,
                          name: req.session.f_name,
                          lastname: req.session.f_lastname,
                          f_department: req.session.f_department,
                          company_name: env.company_name,
                          f_admin_status: req.session.f_admin_status,
                          f_accounttype: req.session.f_accounttype,
                          datauser: result,
                          countusers: userApprove,     
                          langApprove: lang.langApprove,
                          langCancel : lang.langCancel,                      
                        },
                        messagesboxs: messagesboxs,
                      });
                    res.status(201).json({
                      messagesboxs: lang.usersMessages,
                    });
                  })
                  .catch((error) => {
                    res.status(500).json({
                      messagesboxs: error,
                    });
                  });
              })
          .catch((error) => {
                res.status(500).json({
                  messagesboxs: error,
                });
              });        
    })
    .catch(err => {
      res.status(500).send({
        messagesboxs: lang.usersDeleteError + id
      });
    });
     } else {
    res.redirect(setting.rootPage);
  }
};

exports.adduserController = (req, res, next) => {
  if (req.session.f_login_name) {
     UserModel.findcountUsers()
      .then((result) => {
        var userApprove = result.count;
        UserModel.findUserAll()
          .then((result) => {
                  res.render(setting.usersPageAdd, {
                    data: {
                      title: lang.usersTitles,
                      titledetail: lang.usersTilte,
                      apptitle: env.apptitle,
                      logo: env.logo_app,
                      name: req.session.f_name,
                      lastname: req.session.f_lastname,
                      f_department: req.session.f_department,
                      company_name: env.company_name,
                      f_admin_status: req.session.f_admin_status,
                      f_accounttype: req.session.f_accounttype,
                      datauser: result,
                      countusers: userApprove,                     
                    },messagesboxs: lang.Loadmessagesboxs,
                   
                  });
                res.status(201).json({
                  messagesboxs: lang.messagesBoxsSuccess,
                });
              })
              .catch((error) => {
                res.status(500).json({
                  messagesboxs: error,
                });
              });
          })
      .catch((error) => {
            res.status(500).json({
              messagesboxs: error,
            });
          });
  } else {
    res.redirect(setting.rootPage);
  }
};

exports.saveuserController = (req, res, next) => {
  if (req.session.f_login_name) {
  bcrypt.genSalt(saltRounds, (err, salt) => {
    let ts = Date.now();
    const passworddata = md5(req.body.f_login_password) + salt;
    bcrypt
      .hash(req.body.f_login_password, saltRounds)
      .then((hash) => {
        const User = new UserModel({
          f_name: req.body.f_name,
          f_lastname: req.body.f_lastname,
          f_login_name: req.body.f_login_name,
          f_login_password: md5(passworddata),
          f_hash_password: hash,
          f_salt_password: salt,
          f_email: req.body.f_login_name,
          f_mobile: setting.mobile,
          f_company: setting.company,
          f_department: setting.department,
          f_position: setting.position,
          f_status: req.body.f_status,
          f_admin_status: req.body.f_admin_status,
          f_accounttype: req.body.f_accounttype,
          f_dateupdate: ts,
        });
        User.registerUser()
          .then((result) => {
            if (!result) {
              var messagesboxs= lang.userInsertError;
             } else {
              var messagesboxs= lang.userInsertMessages;
            }
            UserModel.findcountUsers()
              .then((result) => {
                var userApprove = result.count;
                UserModel.findUserAll()
                  .then((result) => {
                          res.render(setting.userPage, {
                            data: {
                              title: lang.usersTiltes,
                              titledetail: lang.usersTilte,
                              apptitle: env.apptitle,
                              logo: env.logo_app,
                              name: req.session.f_name,
                              lastname: req.session.f_lastname,
                              f_department: req.session.f_department,
                              company_name: env.company_name,
                              f_admin_status: req.session.f_admin_status,
                              f_accounttype: req.session.f_accounttype,
                              datauser: result,
                              countusers: userApprove,     
                              langApprove: lang.langApprove,
                              langCancel : lang.langCancel,                      
                            },
                            messagesboxs: messagesboxs,
                          });
                      })
                      .catch((error) => {
                        res.status(500).json({
                          messagesboxs: error,
                        });
                      });
                  })
              .catch((error) => {
                    res.status(500).json({
                      messagesboxs: error,
                    });
                  });            
          })
          .catch((error) => {
            res.status(500).json({
              messagesboxs: error,
            });
          });
      })
      .catch((error) => {
        res.status(500).json({
          messagesboxs: error,
        });
      });
  });
   } else {
    res.redirect(setting.rootPage);
  }
};

exports.edituserController = (req, res, next) => {
  if (req.session.f_login_name) {
    UserModel.findcountUsers()
    .then((result) => {
      var userApprove = result.count;
      const f_acc_code = req.params.id;
      UserModel.findUserone(f_acc_code)
        .then((result) => {
          var resultUsers = result.dataValues;
                    res.render(setting.usersPageEdit, {
                      data: {
                        title: lang.usersTitles,
                        titledetail: lang.usersTilte,
                        apptitle: env.apptitle,
                        logo: env.logo_app,
                        name: req.session.f_name,
                        lastname: req.session.f_lastname,
                        f_department: req.session.f_department,
                        company_name: env.company_name,
                        f_admin_status: req.session.f_admin_status,
                        f_accounttype: req.body.f_accounttype,
                        countusers: userApprove,
                        datauser: resultUsers,
                      },messagesboxs: lang.Loadmessagesboxs,
                    });
        })
          .catch((error) => {
                  res.status(500).json({
                    messagesboxs: error,
                  });
                });
        })
        .catch((error) => {
              res.status(500).json({
                messagesboxs: error,
              });
        });
     } else {
    res.redirect(setting.rootPage);
  }
};

exports.updateController = (req, res, next) => {
  if (req.session.f_login_name) {
    const f_acc_code = req.params.id;
    UserModel.updateUsers(f_acc_code,req.body)
    .then(function (result) {
            if (!result) {
              var messagesboxs= lang.usersUpdateError;
             } else {
              var messagesboxs= lang.usersUpdateMessages;
            } 
            UserModel.findcountUsers()
              .then((result) => {
                var userApprove = result.count;
                UserModel.findUserAll()
                  .then((result) => {
                          res.render(setting.userPage, {
                            data: {
                              title: lang.usersTiltes,
                              titledetail: lang.usersTilte,
                              apptitle: env.apptitle,
                              logo: env.logo_app,
                              name: req.session.f_name,
                              lastname: req.session.f_lastname,
                              f_department: req.session.f_department,
                              company_name: env.company_name,
                              f_admin_status: req.session.f_admin_status,
                              f_accounttype: req.session.f_accounttype,
                              datauser: result,
                              countusers: userApprove,     
                              langApprove: lang.langApprove,
                              langCancel : lang.langCancel,                      
                            },
                            messagesboxs: messagesboxs,
                          });
                        res.status(201).json({
                          messagesboxs: lang.usersMessages,
                        });
                      })
                      .catch((error) => {
                        res.status(500).json({
                          messagesboxs: error,
                        });
                      });
                  })
              .catch((error) => {
                    res.status(500).json({
                      messagesboxs: error,
                    });
                  });      
    })
    .catch(err => {
      res.status(500).send({
        messagesboxs: lang.usersErrorUpdate + id
      });
    });
     } else {
    res.redirect(setting.rootPage);
  }
};

exports.renewpasswordController = (req, res, next) => {
  const { f_login_name = "", f_login_password } = req.body;
    res.render(setting.renewPasswordPage, { title: env.app_name, logo: env.logo_app, messagesbox: lang.messagesBoxTitle, messagesboxs: lang,messagesBoxTitle });
}

exports.resetpasswordController = (req, res, next) => {
  const f_login_name = req.body.f_login_name;
  const f_activecode = req.body.f_activecode;
  const f_login_password = req.body.f_login_password;
  UserModel.findUserByEmail({ f_login_name: f_login_name })
      .then((result) => {
        if (result.length !== 0) {
              UserModel.activeCode(f_login_name, f_activecode, f_login_password);
            res.redirect(setting.rootPage);
        } else {
            res.redirect(setting.rootPage);
        }
    })
      .catch((error) => {
        res.render(setting.usersPage, {
          title: env.app_name,
          logo: env.logo_app,
          company_name: env.company_name,
          messagesboxs: lang.usersErrorMessages,
          });
        });
}

exports.usersController = (req, res, next) => {};
